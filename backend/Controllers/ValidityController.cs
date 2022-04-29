using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services.Interfaces;

namespace Backend.Controllers;

public class ValidityController : Controller
{
    private readonly ILogger<ValidityController> _logger;
    private readonly IFarmerService _farmerService;
    private readonly ICertService _certService;
    public ValidityController(
        ILogger<ValidityController> logger,
        IFarmerService farmerService,
        ICertService certService)
    {
        _logger = logger;
        _farmerService = farmerService;
        _certService = certService;
    }

    [HttpGet]
    public IActionResult Index([FromQuery]string phone)
    {
        if (phone[0] != '+')
            phone = $"+{phone.Trim()}";
        var certs = _certService.GetByFarmer(phone);
        ViewData["certs"] = certs is null ? 
            "has no certs" :
            $"has {certs.Count(cert => cert.Status == CertificateStatus.VALID)} valid certificates";
        
        Response.ContentType = "application/xml";
        return View();
    }
}