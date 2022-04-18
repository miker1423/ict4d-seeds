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
        private static string twilioText = "<Response><Say>Hello ";
        private static string twilioText2 = ", your certificate is ready.</Say></Response>";

        [FunctionName("xml_request")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ExecutionContext context,
            ILogger log)
        {
            log.LogInformation("HTTP trigger function processed a request.");

            var config = new ConfigurationBuilder()
                .SetBasePath(context.FunctionAppDirectory)
                .AddJsonFile("local.settings.json", true, true)
                .AddEnvironmentVariables()
                .Build();

            string ref_num = req.Query["reference_num"];
            if (ref_num is null) {
                log.LogInformation("No name found, return base xml");
                return new OkObjectResult(new{});
            }

            var twilioSid = config["TWILIO_SID"];
            var twilioToken = config["TWILIO_TOKEN"];
            if (twilioSid is null || twilioToken is null) {
                log.LogInformation("Twilio config missing");
                return new BadRequestResult();
            }
            TwilioClient.Init(twilioSid, twilioToken);


            var twilioCallingNumber = config["TWILIO_NUMBER"];
            if(twilioCallingNumber is null){
                log.LogInformation("Twilio number missing");
                return new BadRequestResult();
            }
            var buffer = new StringBuilder(twilioText);
            buffer.Append(ref_num);
            buffer.Append(twilioText2);
            var call = CallResource.Create(
              twiml: new Twilio.Types.Twiml(buffer.ToString()),
              to: new Twilio.Types.PhoneNumber("+31683139714"),
              from: new Twilio.Types.PhoneNumber(twilioCallingNumber)
            );

            var res = new ContentResult();
            res.ContentType = "application/voicexml+xml";
            res.Content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><vxml xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.w3.org/2001/vxml\" version=\"2.1\" application=\"http://webhosting.voxeo.net/170418/www/root.vxml\"></vxml>";
            return res;
        }
    }
}
