using Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.Services.Interfaces;

public interface ICertService 
{
    public Task<CertRequest> CreateRequest(Guid farmerId);

    public Task<bool> CompleteRequest(Guid requestId);

    public List<Certificate> HasValidCert(Guid farmerId);
}