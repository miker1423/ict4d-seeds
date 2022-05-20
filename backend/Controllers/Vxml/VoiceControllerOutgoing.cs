using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using Microsoft.AspNetCore.Mvc;
using Twilio.AspNet.Mvc;
using Twilio.TwiML;

namespace backend.Controllers.Vxml
{
    [Route("vxml/[controller]")]
    class VoiceControllerOutgoing
    { 
        
        // Find your Account Sid and Auth Token at twilio.com/console
        public VoiceControllerOutgoing(){
            const string accountSid = "AC048d50f85488881f6b5b34e685141e1d";
            const string authToken = "your_auth_token";
            TwilioClient.Init(accountSid, authToken);
        }
        
        public string callFarmer(PhoneNumber num, bool result){
            var from = new PhoneNumber("+15017122661"); //TODO: currently placeholder - num switch to owned twilio number soon
            string xmlFilez = "";
            if(result){
                xmlFilez = "../Views/XMLs/OutgoingPositive.xml";
            } else {
                xmlFilez = "../Views/XMLs/OutgoingNegative.xml";
            }
            var call = CallResource.Create(num, from,
                url: new Uri(xmlFilez)
            );

            Console.WriteLine(call.Sid); //tests 

            return call.Sid;
        }

    }
}