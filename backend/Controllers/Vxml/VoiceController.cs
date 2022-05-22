using Microsoft.AspNetCore.Mvc;
using Twilio.AspNet.Mvc;
using Twilio.TwiML;

namespace Backend.Controllers.Vxml;

[Route("vxml/[controller]")]
public class VoiceController : Controller
{   

    public VoiceController(){
        const string accountSid = "AC048d50f85488881f6b5b34e685141e1d";
        const string authToken = "5ad96ea44d6d55266c8112c5430556d0"; //HIDE!!!
        TwilioClient.Init(accountSid, authToken);
    }

    [HttpGet("[action]")]
    public IActionResult Index()
    {
        return View();
    }

}