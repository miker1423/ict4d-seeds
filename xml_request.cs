using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Text;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Microsoft.Extensions.Configuration;

namespace ict4d
{
    public static class xml_request
    {
        private static string storedXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><vxml xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.w3.org/2001/vxml\" version=\"2.1\" application=\"http://webhosting.voxeo.net/170418/www/root.vxml\"><property name=\"inputmodes\" value=\"dtmf\"/><form scope=\"dialog\"><block><break time=\"1000\"/>Hello ";
        private static string storedXml2 =", your certificate is ready.</block></form><catch event=\"end\"><disconnect/></catch></vxml>";

        private static string twilioText = "<Response><Say>Hello ";
        private static string twilioText2 = ", your certificate is ready.</Say></Response>";

        [FunctionName("xml_request")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("HTTP trigger function processed a request.");

            string name = req.Query["name"];
            if (name is null) {
                log.LogInformation("No name found, return base xml");
                return new OkObjectResult(new{});
            }

            var twilioSid = Environment.GetEnvironmentVariable("TWILIO_SID");
            var twilioToken = Environment.GetEnvironmentVariable("TWILIO_TOKEN");
            if (twilioSid is null || twilioToken is null) {
                log.LogInformation("Twilio config missing");
                return new BadRequestResult();
            }
            TwilioClient.Init(twilioSid, twilioToken);


            var twilioCallingNumber = Environment.GetEnvironmentVariable("TWILIO_NUMBER");
            if(twilioCallingNumber is null){
                log.LogInformation("Twilio number missing");
                return new BadRequestResult();
            }
            var buffer = new StringBuilder(twilioText);
            buffer.Append(name);
            buffer.Append(twilioText2);
            var call = CallResource.Create(
              twiml: new Twilio.Types.Twiml(buffer.ToString()),
              to: new Twilio.Types.PhoneNumber("+31683139714"),
              from: new Twilio.Types.PhoneNumber(twilioCallingNumber)
            );


            return new OkObjectResult(call.Sid);
        }
    }
}
