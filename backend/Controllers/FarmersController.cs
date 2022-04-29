using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services.Interfaces;

namespace Backend.Controllers;

[Route("Farmers")]
public class FarmersController : Controller
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
    
    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody]FarmerVM farmer)
    {
        _logger.LogDebug("Received farmer", farmer);
        var newFarmer = await _farmerService.Create(farmer);
        return CreatedAtAction(null, newFarmer.ID, newFarmer);
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