using System.ComponentModel.DataAnnotations;
using Backend.Data;
using Backend.Models;
using Backend.Services.Interfaces;
using Twilio.TwiML;

namespace Backend.Services;

public class CertService : ICertService
{
    private readonly FarmersDbContext _context;
    private readonly ICallerService _callerService;
    private readonly int min = 0;
    private readonly int max = 9999;
    private readonly Random rnd = new();
    public CertService(FarmersDbContext context, ICallerService callerService)
    {
        _context = context;
        _callerService = callerService;
    }

    public async Task<(bool, Certificate?)> CompleteRequest(Guid requestId, CertificateStatus status, CertificateVM vm)
    {
       uint GeneratePin() => (uint)rnd.Next(min, max);

        var cert = _context.CertRequests.FirstOrDefault(cert => cert.ID == requestId);
        if (cert is null) return (false, null);
        cert.Status = RequestStatus.FINISHED;
        // Call farmer
        var farmer = _context.Farmers.FirstOrDefault(farmer => farmer.ID == cert.FarmerId);
        if(farmer is null || farmer.PhoneNumber is null) {
            // no way to get to this guy/girl
            return (false, null);
        }
        var newCert = await _context.Certificates.AddAsync(new Certificate() {
            FarmerId = farmer.ID,
            Status = status,
            CertPer = vm.CertPer,
            BatchNO = vm.BatchNO,
            Organization = vm.Organization,
            VarPur = vm.VarPur,
            GerFac = vm.GerFac,
            DateCreated = DateTime.Now.Date.ToString("dd/MM/yyyy"),
            SeedVariety = vm.SeedVar,
            LastChanged = DateTime.Now.Date.ToString("dd/MM/yyyy"),
        });
        _context.CertRequests.Update(cert);
        await _context.SaveChangesAsync();
        return (true, newCert.Entity);
    }

    public async Task<CertRequest> CreateRequest(Guid farmerId)
    {
        var certRequest = new CertRequest() {
            FarmerId = farmerId,
            Status = RequestStatus.CREATED,
        };
        var request = await _context.CertRequests.AddAsync(certRequest);
        await _context.SaveChangesAsync();
        return request.Entity;
    }

    public List<Certificate>? GetByFarmer([Phone] string phone)
    {
        var farmer = _context.Farmers.FirstOrDefault(farm => farm.PhoneNumber == phone);
        if(farmer is null)
            return null;
        
        return _context.Certificates.Where(cert => cert.FarmerId == farmer.ID).ToList();
    }

    public Certificate? GetById(Guid id)
        => _context.Certificates.FirstOrDefault(cert => cert.ID == id);

    public List<Certificate> GetCertificates()
        => _context.Certificates.ToList();

    public List<Certificate> HasValidCert(Guid farmerId)
        => _context.Certificates.Where(cert => cert.FarmerId == farmerId && cert.Status == CertificateStatus.VALID).ToList();

    public async Task<(bool, Certificate?)> Invalidate(Guid certId)
    {
        var cert = _context.Certificates.FirstOrDefault(cert => cert.ID == certId);
        if(cert is null) 
            return (false, cert);
        
        cert.Status = CertificateStatus.REVOKED;
        _context.Certificates.Update(cert);
        await _context.SaveChangesAsync();
        return (true, cert);
    }

    public async Task<bool> Update(Certificate certificate)
    {
        var _ = _context.Certificates.Update(certificate);
        var updated = await _context.SaveChangesAsync();
        return updated > 0;
    }
}