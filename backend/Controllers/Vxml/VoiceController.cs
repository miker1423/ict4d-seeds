using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Twilio.AspNet.Common;
using Twilio.AspNet.Core;
using Twilio.TwiML;

namespace Backend.Controllers.Vxml;

[Route("[controller]")]
public class VoiceController : TwilioController
{
    private readonly IMemoryCache _cache;
    private readonly ICallerService _callerService;
    public VoiceController(
        ICallerService callerService,
        IMemoryCache cache)
    {
        _cache = cache;
        _callerService = callerService;
    }

    [HttpGet("[action]")]
    public IActionResult Index()
    {
        var basePath = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}";
        var path = $"{basePath}/audio/EN/IntroductionEN.wav";
        _callerService.CallNow("+31683139714", path, true, basePath);
        return Ok();
    }

    [HttpPost("[action]")]
    public TwiMLResult EN(VoiceRequest request)
        => LangIndependent(request, "EN");

    [HttpPost("[action]")]
    public TwiMLResult NO(VoiceRequest request)
        => LangIndependent(request, "NO");

    private TwiMLResult LangIndependent(VoiceRequest request, string lang)
    {
        var response = new VoiceResponse();
        var item = _cache.Get<CertCacheItem>(request.From);
        if (string.IsNullOrWhiteSpace(request.Digits))
        {
            switch (request.Digits)
            {
                case "1":
                    var audio = (item?.IsValid ?? false) ? "Approved" : "Rejected";
                    response.Play(new Uri($"/audio/{lang}/{audio}Certification{lang}.wav", UriKind.Relative));
                    break;
                case "2":
                    var otherLang = lang == "EN" ? "NO" : "EN";
                    response.Redirect(new Uri($"/voice/{otherLang}", UriKind.Relative));
                    break;
                case "3":
                    response.Play(new Uri($"/audio/{lang}/WrongCall{lang}.wav", UriKind.Relative));
                    break;
                default:
                    break;
            }
        } 
        else
        {
            response.Play(new Uri($"/audio/Introduction{lang}.wav", UriKind.Relative));
        }

        return TwiML(response);
    }

}