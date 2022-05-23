using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.Services.Interfaces;

public interface ICertService 
{
    public List<Certificate> GetCertificates();    
    public Task<CertRequest> CreateRequest(Guid farmerId);

    public Task<(bool, Certificate?)> CompleteRequest(Guid requestId, CertificateStatus status, CertificateVM vm);

    public List<Certificate> HasValidCert(Guid farmerId);

    public Task<(bool, Certificate?)> Invalidate(Guid certId);

    public List<Certificate>? GetByFarmer([Phone]string phone);

    public Certificate? GetById(Guid id);

    public Task<bool> Update(Certificate certificate);
}