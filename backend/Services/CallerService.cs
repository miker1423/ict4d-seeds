using System.ComponentModel.DataAnnotations;
using Backend.Services.Interfaces;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace Backend.Services;

public class CallerService : ICallerService 
{
    private readonly PhoneNumber _callerPhone;
    public CallerService(IConfiguration configuration)
    {
        var sid = configuration.GetValue<string>("Twilio:SID");
        var token = configuration.GetValue<string>("Twilio:Token");
        _callerPhone = new PhoneNumber(configuration.GetValue<string>("Twilio:Phone"));

        TwilioClient.Init(sid, token);
    }
    public async Task CallNow([Phone]string phone, string text)
    {
        var toNumber = new PhoneNumber(phone);
        await CallResource.CreateAsync(twiml: text, to: toNumber, from: _callerPhone);
    }
}