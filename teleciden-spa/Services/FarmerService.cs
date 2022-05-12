using Backend.Services.Interfaces;
using Backend.Models;
using Backend.Data;
using System.ComponentModel.DataAnnotations;

namespace Backend.Services;

public class FarmerService : IFarmerService
{
    private readonly FarmersDbContext _context;
    public FarmerService(FarmersDbContext context)
        => _context = context;

    public async Task<Farmer> Create(FarmerVM farmer)
    {
        var exists = _context.Farmers.FirstOrDefault(far => far.PhoneNumber == farmer.PhoneNumber);
        if(exists is not null) return exists;
        var newFarmer = new Farmer()
        {
            Name = farmer.Name,
            PhoneNumber = farmer.PhoneNumber
        };
        var result = await _context.Farmers.AddAsync(newFarmer);
        await _context.SaveChangesAsync();
        return result.Entity;
    }

    public bool Exists(Guid id)
        => _context.Farmers.Count(farmer => farmer.ID == id) > 0;

    public Farmer? FindByPhone([Phone] string phone)
        => _context.Farmers.FirstOrDefault(farmer => farmer.PhoneNumber == phone);

    public List<Farmer> GetFarmers()
        => _context.Farmers.ToList();
}