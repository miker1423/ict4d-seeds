using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using Microsoft.AspNetCore.Mvc;
using Twilio.AspNet.Mvc;
using Twilio.TwiML;
using Twilio.TwiML.Voice;
using Backend.Models;
using Backend.Services.Interfaces;

namespace backend.Controllers.Vxml
{
    [Route("vxml/[controller]")]
    class VoiceControllerOutgoing
    { 
        private readonly ICertService _certService;

        public VoiceControllerOutgoing(ICertService certService){
                _certService = certService;
        }
        // Find your Account Sid and Auth Token at twilio.com/console

        [HttpPost]
        public TwiMLResult index(string lang="EN"){
            var response = new VoiceResponse();
            
            //Not good convention... but...
            Uri greetingURI = new Uri("");
            Uri MenuUri = new Uri("");
            
            //COULD USE SWITCH...
            if(lang.Equals("EN")){
                greetingURI = new Uri("http://7819-187-188-63-71.ngrok.io/audio/English/IntroductionEN.wav");
                MenuUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/English/MenuEN.wav");
            }
            else if(lang.Equals("NO")) {
                greetingURI = new Uri("http://7819-187-188-63-71.ngrok.io/audio/Nowegian/IntroductionNO.wav");
                MenuUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/Nowegian/MenuNO.wav");
            }
            else {
                //TODO: ERROR HANDLING
                greetingURI = new Uri("http://7819-187-188-63-71.ngrok.io/audio/English/IntroductionEN.wav");
                MenuUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/English/MenuEN.wav");
            }
            response.Play(greetingURI);
            
            response.Gather(
            numDigits: 1, action: new Uri("/voice/MainMenu?="+lang, UriKind.Relative)
            ).Play(MenuUri).Pause(10); //takes numbs and moves on

        response.Redirect(new Uri("/voice?lang=EN", UriKind.Relative));

        return TwiML(response);
        }
        

        [HttpPost]
        public TwiMLResult MainMenu(VoiceRequest req, string lang="EN"){
            var response = new VoiceResponse();
            if(!string.IsNullOrEmpty(req.Digits)){    
                switch(req.Digits){
                    case "1":
                        response.Redirect(new Uri("/voice/StatusReveal?lang="+lang, UriKind.Relative));
                        break;
                    case "2":
                        response.Redirect(new Uri("/voice/EndCall?lang="+lang, UriKind.Relative));
                        break;
                    case "3":
                        response.Redirect(new Uri("/voice/LangChange?lang="+lang, UriKind.Relative));
                        break;
                    default:
                        response.Say("I'm sorry, that choice does not work").Pause();
                        response.Redirect(new Uri("/voice?lang="+lang, UriKind.Relative));
                        break;
                }
            }
            return TwiML(response);
        }

        [HttpPost]//Shit code incoming
        public TwiMLResult StatusReveal(PhoneNumber from, string lang="EN"){

            //TODO: BETTER ERROR HANDLING!!!
            var response = new VoiceResponse();
            var status = new CertificateStatus();
            //check status
            Uri PositiveUri = new Uri("");
            Uri NegativeUri = new Uri("");
            Certificate newestCert = new Certificate();
            
            if(lang.Equals("EN")){
                PositiveUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/English/ApprovedCertificationEN.wav");
                NegativeUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/English/RejectedCertificationEN.wav");
            }
            else if(lang.Equals("NO")) {
                PositiveUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/Nowegian/ApprovedCertificationNO.wav");
                NegativeUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/Nowegian/RejectedCertificationNO.wav");
            }
            else {
                //TODO: ERROR HANDLING
                PositiveUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/English/ApprovedCertificationEN.wav");
                NegativeUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/English/RejectedCertificationEN.wav");
            }

            if(from is not null && !string.IsNullOrWhiteSpace(from.ToString()))
            {
                var certificates = _certService.GetByFarmer(from.ToString());
                if(certificates is null){
                //error handling
                }       
                
                DateTime bigDt = new DateTime(1950, 1, 1);
                
                foreach(var certif in certificates){
                    if(certif.DateCreate > bigDt){
                        bigDt = certif.DateCreate;
                        newestCert = certif;
                    }
                }
                status = newestCert.Status;
            }

            if(status.Equals(CertificateStatus.VALID)){
                response.Play(PositiveUri);
            } else {
                response.Play(NegativeUri);
            }

            return TwiML(response);
        }

        [HttpPost]
        public TwiMLResult EndCall(string lang="EN"){
            var response = new VoiceResponse();
            
            response.Hangup();
            return TwiML(response);
        }
        
        [HttpPost]
        public TwiMLResult LangChange(string lang="EN"){
            var response = new VoiceResponse();

            Uri langChangeMenuUri = new Uri("");
            
            if(lang.Equals("EN")){
                langChangeMenuUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/English/LanguageChangeEN.wav");
                
            }
            else if(lang.Equals("NO")) {
                langChangeMenuUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/Nowegian/LanguageChangeNO.wav");
            }
            else {
                //TODO: ERROR HANDLING
                langChangeMenuUri = new Uri("http://7819-187-188-63-71.ngrok.io/audio/English/LanguageChangeEN.wav");
            }
            response.Gather(
                 numDigits: 1, action: new Uri("/voice/langMenu?="+lang, UriKind.Relative)
            ).Play(langChangeMenuUri).Pause(10);

            response.Redirect(new Uri("/voice/LangChange?lang="+lang, UriKind.Relative));

            return TwiML(response);
        }

        [HttpPost]
        public TwiMLResult LangMenu(VoiceRequest req, string lang="EN"){
            var response = new VoiceResponse();
            if(!string.IsNullOrEmpty(req.Digits)){    
                switch(req.Digits){
                    case "1":
                        if(lang.Equals("EN")){lang="NO";}
                        else {lang="EN";}
                        response.Redirect(new Uri("/voice?lang="+lang, UriKind.Relative));
                        break;
                    case "2":
                        if(lang.Equals("EN")){lang="EN";}
                        else {lang="NO";}
                        response.Redirect(new Uri("/voice?lang="+lang, UriKind.Relative));
                        break;
                    default:
                        response.Say("I'm sorry, that choice does not work").Pause();
                        response.Redirect(new Uri("/voice?lang="+lang, UriKind.Relative));
                        break;
                }
            }
            return TwiML(response);
        }
    }
}