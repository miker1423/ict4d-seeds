using System.ComponentModel.DataAnnotations;
using Backend.Models;

namespace Backend.Services.Interfaces;

public interface IFarmerService 
{
    List<Farmer> GetFarmers();
    Farmer? FindByPhone([Phone]string phone);

    Task<Farmer> Create(FarmerVM farmer);

    bool Exists(Guid id);
}