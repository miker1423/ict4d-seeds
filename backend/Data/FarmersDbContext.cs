using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Backend.Data;

#nullable disable

public class FarmersDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
{
    public FarmersDbContext(DbContextOptions<FarmersDbContext> contextOptions)
        : base(contextOptions) {}

    public DbSet<Farmer> Farmers { get; set; }

    public DbSet<CertRequest> CertRequests { get; set; }

    public DbSet<Certificate> Certificates { get; set; }
}