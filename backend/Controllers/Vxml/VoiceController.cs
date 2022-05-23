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
        _callerService.CallNow("+31683139714", true, basePath);
        return Ok();
    }

    [HttpPost("[action]")]
    public TwiMLResult Loop()
    {
        var basePath = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}";
        var response = _callerService.GetResponse(basePath);
        return TwiML(response);
    }

    [HttpPost("[action]")]
    public TwiMLResult EN(VoiceRequest request)
        => LangIndependent(request, "EN");

    [HttpPost("[action]")]
    public TwiMLResult NO(VoiceRequest request)
        => LangIndependent(request, "NO");

    private TwiMLResult LangIndependent(VoiceRequest request, string lang)
    {
        var basePath = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}";
        var response = new VoiceResponse();
        var item = _cache.Get<CertCacheItem>(request.From);
        if (!string.IsNullOrWhiteSpace(request.Digits))
        {
            switch (request.Digits)
            {
                case "1":
                    var audio = (item?.IsValid ?? true) ? "Approved" : "Rejected";
                    response.Play(new Uri($"{basePath}/audio/{lang}/{audio}Certification{lang}.wav"));
                    break;
                case "2":
                    response.Play(new Uri($"{basePath}/audio/{lang}/WrongCall{lang}.wav"));                    
                    break;
                case "3":
                    var otherLang = lang == "EN" ? "NO" : "EN";
                    response.Redirect(new Uri($"{basePath}/voice/{otherLang}"));
                    break;
                default:
                    break;
            }
        } 
        else
        {
            response.Gather(numDigits: 1, action: new Uri($"{basePath}/voice/en"))
                    .Play(new Uri($"{basePath}/audio/en/MenuEN.wav"));

            response.Redirect(new Uri($"{basePath}/voice/loop"));
        }

        return TwiML(response);
    }

}