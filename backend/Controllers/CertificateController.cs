using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Controllers;

[Route("Certificate")]
public class CertificateController : Controller 
{
    private readonly ILogger<CertificateController> _logger;
    private readonly ICertService _certService;
    private readonly IFarmerService _farmerService;

    public CertificateController(
        ILogger<CertificateController> logger,
        ICertService certService,
        IFarmerService farmerService)
    {
        _logger = logger;
        _certService = certService;
        _farmerService = farmerService;
    }


    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody]CertificateVM certVM)
    {
        if(certVM.PhoneNumber is null)
            return BadRequest("Phone number is invalid");
        var farmer = _farmerService.FindByPhone(certVM.PhoneNumber);
        if(farmer is null) 
            return BadRequest("No farmer with number");

        var cert = await _certService.CreateRequest(farmer.ID);
        var status = certVM.IsValid ? CertificateStatus.VALID : CertificateStatus.INVALID;
        var (success, newCert) = await _certService.CompleteRequest(cert.ID, status);
        if(!success)
            return BadRequest("The farmer does not have a phone number");
        return CreatedAtAction("", newCert);
    }

    [HttpGet("get_phone/{phone}")]
    public IActionResult Get([FromRoute][Phone]string phone)
    {
        var certs = _certService.GetByFarmer(phone);
        if(certs is null)
            return BadRequest("No farmer with this number");
        return Ok(certs);
    }


    [HttpGet("get_id/{id}")]
    public IActionResult Get([FromRoute]Guid id)
    {
        var cert = _certService.GetById(id);
        return Ok(cert);
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Remove([FromRoute]Guid id)
    {
        var invalidCert = await _certService.Invalidate(id);
        return Ok(invalidCert);
    }
}