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
    public async System.Threading.Tasks.Task CallNow([Phone]string phone, bool isValid, string basePath)
    {
        var toNumber = new PhoneNumber(phone);

        var certCacheItem = _cache.Set(phone, new CertCacheItem()
        {
            IsValid = isValid,
            Phone = phone,
            State = 0
        });
        var text = GetText(basePath);
        var response = await CallResource.CreateAsync(twiml: text, to: toNumber, from: _callerPhone);
        return;
    }

    public VoiceResponse GetResponse(string basePath)
    {
        var gather = new Gather()
        {
            NumDigits = 1,
            Action = new Uri($"{basePath}/voice/en"),
            Timeout = 2,
        };
        gather.Play(new Uri($"{basePath}/audio/en/MenuEN.wav"));
        var response = new VoiceResponse();
        response.Play(new Uri($"{basePath}/audio/en/IntroductionEN.wav"));
        response.Append(gather);
        response.Redirect(new Uri($"{basePath}/voice/loop"));
        return response;
    }

    public string GetText(string basePath)
    {
        var response = GetResponse(basePath);
        return response.ToString();
    }
}