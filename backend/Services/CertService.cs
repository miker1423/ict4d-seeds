using System.ComponentModel.DataAnnotations;
using Backend.Data;
using Backend.Models;
using Backend.Services.Interfaces;

namespace Backend.Services;

public class CertService : ICertService
{
    private readonly FarmersDbContext _context;
    private readonly ICallerService _callerService;
    public CertService(FarmersDbContext context, ICallerService callerService)
    {
        _context = context;
        _callerService = callerService;
    }

    public async Task<bool> CompleteRequest(Guid requestId)
    {
        var cert = _context.CertRequests.FirstOrDefault(cert => cert.ID == requestId);
        if (cert is null) return false;
        cert.Status = RequestStatus.FINISHED;
        // Call farmer
        var farmer = _context.Farmers.FirstOrDefault(farmer => farmer.ID == cert.FarmerId);
        if(farmer is null || farmer.PhoneNumber is null) {
            // no way to get to this guy/girl
            return false;
        }
        await _callerService.CallNow(farmer.PhoneNumber, "Hello there");
        _context.CertRequests.Update(cert);
        await _context.SaveChangesAsync();
        return true;
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

    public List<Certificate> HasValidCert(Guid farmerId)
        => _context.Certificates.Where(cert => cert.FarmerId == farmerId && cert.Status == CertificateStatus.VALID).ToList();
}