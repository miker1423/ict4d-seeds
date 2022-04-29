using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Farmer
{
    [Key]
    public Guid ID { init; get; }

    [Phone]
    public string? PhoneNumber { get; set; }
    
    public string? Name { get; set; }
    public string SelectedLang { get; set; } = "en";
}

public class FarmerVM
{
    [Phone]
    public string? PhoneNumber { get; set; }

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
}