using System.ComponentModel.DataAnnotations;
using Twilio.TwiML;

namespace Backend.Services.Interfaces;

public interface ICallerService 
{
    Task CallNow([Phone]string phone, bool isValid, string basePath);

    VoiceResponse GetResponse(string basepath);
}