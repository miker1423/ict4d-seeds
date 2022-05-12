using Microsoft.AspNetCore.Mvc;
using Twilio.AspNet.Mvc;
using Twilio.TwiML;

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