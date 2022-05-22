using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class CertificateController : ControllerBase
{
    private readonly ILogger<CertificateController> _logger;
    private readonly ICertService _certService;
    private readonly IFarmerService _farmerService;
    private readonly ICallerService _callerService;

    public CertificateController(
        ILogger<CertificateController> logger,
        ICertService certService,
        IFarmerService farmerService,
        ICallerService callerService)
    {
        _logger = logger;
        _certService = certService;
        _farmerService = farmerService;
        _callerService = callerService;
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
        var path = $"{basePath}/audio/EN/IntroductionEN.wav";
        var callTask = _callerService.CallNow(certVM.PhoneNumber, path, certVM.IsValid, path);
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> Remove([FromRoute]Guid id)
    {
        var invalidCert = await _certService.Invalidate(id);
        return Ok(invalidCert);
    }
}