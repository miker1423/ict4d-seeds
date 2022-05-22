using Twilio.AspNet.Mvc;
using Twilio.TwiML;
using Twilio;
using Twilio.Types;

namespace Backend.Controllers.Vxml;

public class VoiceIncomingController : TwilioController {

    [HttpPost]
    public TwiMLResult Index(PhoneNumber from){
        var response = new VoiceResponse();
        response.Say("Hello and Welcome to TeleCiden, we make communication between you and the Labs of Mali possible.");
        response.Pause(1); 
        response.Say("What can we help you with today?");
        response.Gather(
            numDigits: 1, action: new Uri("/voice/MainMenu", UriKind.Relative)
        ).Say("For status of your application, type 1").Pause(2).Say("For information on this service, type 2").Pause(10);

        response.Redirect(new Uri("/voice", UriKind.Relative));

        return TwiML(response);
    }

    [HttpPost]
    public TwiMLResult MainMenu(VoiceRequest req){
        var response = new VoiceResponse();
        if(!string.IsNullOrEmpty(req.Digits)){    
            switch(req.Digits){
                case "1":
                    response.Redirect(new Uri("StatusCheck", UriKind.Relative));
                    break;
                case "2":
                    response.Redirect(new Uri("LearnMore", UriKind.Relative));
                    break;
                default:
                    response.Say("I'm sorry, that choice does not work").Pause();
                    response.Redirect(new Uri("/voice", UriKind.Relative));
                    break;
            }
        } else {
            response.Redirect(new Uri("/voice", UriKind.Relative));
        }
    }

    [HttpPost]
    public TwiMLResult StatusCheck(VoiceRequest req, PhoneNumber from){
        var response = new VoiceResponse();

        //check status of certification
        //string certification = CertificationControl.CheckStatus(from)
        string certification = "Positive";
        switch(certification){
            case "Positive":
                response.Say("The lab analyzed your sent sample, and it has passed all our quality requirements").Pause(1);
                response.Say("We have contacted your local union, and they will facilitate a printing of your certificate.").Pause(2);
                response.Say("If you do not hear anything from the Union within the next two weeks, please contact them.");
                break;

            case "Negative":
                response.Say("With your newest application, we have recieved a sample which does not achieve the standards for certification").Pause(2);
                response.Say("Therefore, we have unfortunately rejected your application").Pause(2).Say("If you have any questions, please contact"
                +"your local union offices");
                break;

            case "Recieved":
                response.Say("We have recieved your application and your seeds as well, the lab will commence analyzing the sample as soon as possible").Pause(2);
                response.Say("If you do not hear from us in 1 month, please reach out to your local union.");
                break;
            
            case "Not Recieved":
                response.Say("It seems that the lab is yet to recieve your seeds, or have not registered anything yet.");
                break;
            default:
                response.Say("It seems that the lab is yet to recieve your seeds, or have not registered anything yet.").Pause(2);
                response.Say("If you hear nothing from us in two weeks, please contact your local union.");
                break;
        }
    }

    [HttpPost]
    public TwiMLResult LearnMore(VoiceRequest req){
        var response = new VoiceResponse();

        response.Say("This number is connected to a service hosted by LaboSem, a lab that approves quality seeds for use or sale.").Pause(1);
        response.Say("The intention is to make the process faster and smoother for all parties, and facilitate communication between us, you "+
        "and the unions representing you.");
    }


}