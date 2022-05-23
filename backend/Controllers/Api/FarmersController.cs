using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class FarmersController : ControllerBase
{
    private readonly ILogger<FarmersController> _logger;
    private readonly IFarmerService _farmerService;
    private readonly ICertService _certService;

    public FarmersController(
        ILogger<FarmersController> logger,
        ICertService certService,
        IFarmerService farmerService)
    {
        _logger = logger;
        _farmerService = farmerService;
        _certService = certService;
    }

    [HttpGet]
    public IActionResult Get() 
    {
        var farmers = _farmerService.GetFarmers();
        return Ok(farmers);
    }
    
    [HttpPost("[action]")]
    public async Task<IActionResult> Create([FromBody]FarmerVM farmer)
    {
        _logger.LogDebug("Received farmer", farmer);
        var newFarmer = await _farmerService.Create(farmer);
        return CreatedAtAction(null, newFarmer.ID, newFarmer);
    }

    [HttpGet("[action]/{phone}")]
    public IActionResult Find([FromRoute][Phone]string? phone) 
    {
        if(phone is null || string.IsNullOrWhiteSpace(phone))
            return BadRequest("No phone provided");
        var farmer = _farmerService.FindByPhone(phone);
        return Ok(farmer);
    }

    [HttpGet("start/{id}")]
    public async Task<IActionResult> StartCertProcess([FromRoute]Guid id)
    {
        _logger.LogDebug("Starting cert process");
        if(!_farmerService.Exists(id)) 
            return BadRequest();
        var request = await _certService.CreateRequest(id);
        return CreatedAtAction("", request);
    }
}