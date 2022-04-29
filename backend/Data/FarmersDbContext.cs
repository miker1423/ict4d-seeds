using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;

public class FarmersDbContext : DbContext
{
    public FarmersDbContext(DbContextOptions<FarmersDbContext> contextOptions)
        : base(contextOptions) {}

    public DbSet<Farmer> Farmers { get; set; }

    public DbSet<CertRequest> CertRequests { get; set; }

    public DbSet<Certificate> Certificates { get; set; }

    
}