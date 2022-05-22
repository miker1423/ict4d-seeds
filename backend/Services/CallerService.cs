using System.ComponentModel.DataAnnotations;
using Backend.Services.Interfaces;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.TwiML;
using Twilio.Types;
using Twilio.TwiML.Voice;
using Microsoft.Extensions.Caching.Memory;
using Backend.Models;

namespace Backend.Services;

public class CallerService : ICallerService 
{
    private readonly PhoneNumber _callerPhone;
    private readonly IMemoryCache _cache;
    public CallerService(
        IMemoryCache cache,
        IConfiguration configuration)
    {
        var sid = configuration.GetValue<string>("Twilio:SID");
        var token = configuration.GetValue<string>("Twilio:Token");
        _callerPhone = new PhoneNumber(configuration.GetValue<string>("Twilio:Phone"));
        _cache = cache;
        TwilioClient.Init(sid, token);
    }
    public async System.Threading.Tasks.Task CallNow([Phone]string phone, string url, bool isValid)
    {
        var toNumber = new PhoneNumber(phone);

        var certCacheItem = _cache.Set(phone, new CertCacheItem()
        {
            IsValid = isValid,
            Phone = phone,
            State = 0
        });
        var text = GetText(url, isValid);
        var response = await CallResource.CreateAsync(twiml: text, to: toNumber, from: _callerPhone);
        return;
    }

    private string GetText(string url, bool isValid)
    {
        var gather = new Gather()
        {
            Input = new List<Gather.InputEnum> { Gather.InputEnum.Dtmf },
            NumDigits = 1,
            Action = new Uri("/voice/en", UriKind.Relative)
        };
        gather = gather.Append(new Play(new Uri(url)));

        var response = new VoiceResponse();
        response.Append(gather);

        return response.ToString();
    }
}

readonly ref struct MyStruct
{

}