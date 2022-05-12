using Microsoft.AspNetCore.Mvc;
using Twilio.AspNet.Mvc;
using Twilio.TwiML;
namespace Backend.Controllers.Vxml;

[Route("vxml/[controller]")]
public class VoiceIncomingController : TwilioController{

    [HttpPost]
    public ActionResult RecieveIndex(){
        var test = new VoiceResponse();
        test.Say("THIS IS AN INCOMING TEST AAAH");

        return TwiML(test);
    }
}