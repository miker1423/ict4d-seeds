using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class Farmer
{
    [Key]
    public Guid ID { init; get; }
    [Phone]
    [JsonPropertyName("phoneno")]
    public string? PhoneNumber { get; set; }
    [JsonPropertyName("name")]
    public string? Name { get; set; }
    public string SelectedLang { get; set; } = "en";
}

public class FarmerVM
{
    [Phone]
    [JsonPropertyName("phoneno")]
    public string? PhoneNumber { get; set; }
    [JsonPropertyName("name")]

    public string? Name { get; set; }
}

public class CertificateVM 
{
    [Phone]
    public string? PhoneNumber { get; set; }
    public bool IsValid { get; set; }
}

public enum RequestStatus 
{
    CREATED,
    PROCESS,
    FINISHED
}

public class CertRequest 
{
    [Key]
    public Guid ID { init; get; }
    public Guid FarmerId { init; get; }
    public RequestStatus Status { get; set; }
}

public enum CertificateStatus 
{
    VALID,
    INVALID,
    REVOKED
}

public class Certificate
{
    [Key]
    public Guid ID { init; get; }
    public Guid FarmerId { init; get; }
    public CertificateStatus Status { get; set; }
    [JsonPropertyName("seedvar")]
    public string? SeedVariety { get; set; }
    public uint PinNumber { get; set; }
}

public class UserVM
{
    [JsonPropertyName("id")]
    public Guid? ID { get; set; }
    public string? UserName { get; set; }
    public string? Password { get; set; }
    [JsonPropertyName("org")]
    public string? Organization { get; set; }
    [JsonPropertyName("phoneno")]
    public string? PhoneNumber { get; set; }
    [JsonPropertyName("firstname")]
    public string? FirstName { get; set; }
    [JsonPropertyName("middlename")]
    public string? MiddleName { get; set; }
    [JsonPropertyName("lastname")]
    public string? LastName { get; set; }
    [JsonPropertyName("role")]
    public string? Role { get; set; }
}
public class OutUserVM
{
    [JsonPropertyName("id")]
    public Guid? ID { get; set; }
    public string? UserName { get; set; }
    [JsonPropertyName("org")]
    public string? Organization { get; set; }
    [JsonPropertyName("phoneno")]
    public string? PhoneNumber { get; set; }
    [JsonPropertyName("firstname")]
    public string? FirstName { get; set; }
    [JsonPropertyName("middlename")]
    public string? MiddleName { get; set; }
    [JsonPropertyName("lastname")]
    public string? LastName { get; set; }
    [JsonPropertyName("role")]
    public string? Role { get; set; }
}

public class CertCacheItem
{
    [Phone]
    public string? Phone { get; set; }
    public bool IsValid { get; set; }
    public int State { get; set; }
}

public enum ErrorSource {

}

public class LoginVM
{
    public string? UserName { get; set; }
    public string? Password { get; set; }
}