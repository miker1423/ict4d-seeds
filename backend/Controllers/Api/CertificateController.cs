using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services.Interfaces;
using System.ComponentModel.DataAnnotations;
using DinkToPdf.Contracts;
using DinkToPdf;

namespace Backend.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class CertificateController : ControllerBase
{
    private readonly ILogger<CertificateController> _logger;
    private readonly ICertService _certService;
    private readonly IFarmerService _farmerService;
    private readonly ICallerService _callerService;
    private readonly IConverter _converter;

    public CertificateController(
        ILogger<CertificateController> logger,
        IConverter converter,
        ICertService certService,
        IFarmerService farmerService,
        ICallerService callerService)
    {
        _logger = logger;
        _certService = certService;
        _farmerService = farmerService;
        _callerService = callerService;
        _converter = converter;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var certificates = _certService.GetCertificates();
        return Ok(certificates);
    }

    [HttpGet("{id}")]
    public IActionResult Get([FromRoute]Guid? id)
    {
        if (id is null) return BadRequest("No ID provided");
        var certificate = _certService.GetById(id.Value);
        return Ok(certificate);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Create([FromBody]CertificateVM certVM)
    {
        if(certVM.PhoneNumber is null)
            return BadRequest("Phone number is invalid");
        var farmer = _farmerService.FindByPhone(certVM.PhoneNumber);
        if(farmer is null) 
            return BadRequest("No farmer with number");

        var cert = await _certService.CreateRequest(farmer.ID);
        var status = certVM.IsValid ? CertificateStatus.VALID : CertificateStatus.INVALID;
        var basePath = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}";
        var callTask = _callerService.CallNow(certVM.PhoneNumber, certVM.IsValid, basePath);
        var (success, newCert) = await _certService.CompleteRequest(cert.ID, status);
        await callTask;
        if(!success)
            return BadRequest("The farmer does not have a phone number");
        return CreatedAtAction(null, newCert);
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody]Certificate certificate)
    {
        var success = await  _certService.Update(certificate);
        if(!success)
            return BadRequest("I don't know, shit happens");
        return Ok(certificate);
    }

    [HttpGet("[action]")]
    public IActionResult Find([FromQuery][Phone]string? phone, [FromQuery]Guid? id) 
    {
        if(phone is not null && !string.IsNullOrWhiteSpace(phone))
        {
            var certificates = _certService.GetByFarmer(phone);
            if(certificates is null)
                return BadRequest("No farmer with this number");
            return Ok(certificates);
        }
        else if (id is not null && id != Guid.Empty)
        {
            var certificate = _certService.GetById(id.Value);
            if(certificate is null)
                return BadRequest("No certificate with the provided ID");
            return Ok(certificate);
        }
        return BadRequest("No parameter found");
    }

    [HttpGet("[action]/{id}")]
    public IActionResult Download(Guid id)
    {
        var cert = _certService.GetById(id);
        var farmer = _farmerService.GetFarmers().FirstOrDefault(farm => farm.ID == (cert?.FarmerId ?? Guid.Empty));
        if (cert is null) return BadRequest("No cert with that ID");
        var fileName = $"Certificate-{farmer?.Name ?? "Farmer"}";
        var globalSettings = new GlobalSettings
        {
            ColorMode = ColorMode.Color,
            Orientation = Orientation.Portrait,
            PaperSize = PaperKind.A4,
            Margins = new MarginSettings { Top = 10 },
            DocumentTitle = fileName,
        };
        var basePath = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}";
        var objectSettings = new ObjectSettings
        {
            PagesCount = true,
            HtmlContent = GetHtml(cert, basePath),
            WebSettings = { DefaultEncoding = "utf-8", 
                            UserStyleSheet = @"
                        .big_text { grid - area: bt; }
                        .left_text { grid - area: lt; }
                        .right_text { grid - area: rt; }

                        .main_container {
                                margin - left: 20 % ;
                                margin - right: 20 %;
                            }", 
                            LoadImages = true },
            HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
            FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Seed certificate" }
        };
        var pdf = new HtmlToPdfDocument()
        {
            GlobalSettings = globalSettings,
            Objects = { objectSettings }
        };
        var file = _converter.Convert(pdf);
        return File(file, "application/pdf", fileName);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Remove([FromRoute]Guid id)
    {
        var invalidCert = await _certService.Invalidate(id);
        return Ok(invalidCert);
    }

    private static string GetHtml(Certificate cert, string basePath)
    {
        var date = DateTime.UtcNow.Date;
        var random = new Random();
        var html = $@"
<html>
<body>
    < div class=""main_container"" style="""">
    < div class=""grid-container"" style=""
    display: grid;
    grid-template-areas: 'lt bt bt rt';
    background-color: rgba(187, 191, 247, 0.4);
    padding-left: 2%;
    padding-right: 2%;
    "">
        <div class=""big_text"" style=""
        text-align: center;
        "">
            <h2>Certificate for Quality Seeds</h2>
            <h3>Approved by LaboSem, seed laboratory of Mali</h3>
            <img src = ""{basePath}/img/seal.png"" style= ""
                height: 250px;
                width: 250px;
            ""/>
        </div>

        <div class=""left_text"" style=""
            text-align: left;
            margin-top: 10%;
            font-size: large;
            "">
            <p>Variety name: {cert.SeedVariety}</p>
            <br>
            <p>Certification period: {date:dd/MM/yyyy} - {date.AddYears(1):dd/MM/yyyy}</p>
            <br>
            <p>Cert.Identification: 000523</p>
        </div>
        <div class=""right_text"" style=""
        text-align:right;
        margin-top: 10%;
        font-size: large;
        "">
        <p>Batch number: {random.Next(14564, 18467)} </p>
        <br>
        <p>Germification Factor: {random.Next(80, 100)}%</p>
        <br>
        <p>Variatal Purity: {random.Next(80, 100)}%</p>
        </div>
    </div>
</div></body></html>";

        return html;
    }
}