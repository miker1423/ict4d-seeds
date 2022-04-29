

using System.ComponentModel.DataAnnotations;

namespace Backend.Services.Interfaces;

public interface ICallerService 
{
    Task CallNow([Phone]string phone, string text);
}