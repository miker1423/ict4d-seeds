using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers.Vxml;

[Route("vxml/[controller]")]
public class VoiceController : Controller
{   
    [HttpGet("[action]")]
    public IActionResult Index()
    {
        return View();
    }
}