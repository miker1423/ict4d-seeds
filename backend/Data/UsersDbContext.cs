using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;

#nullable disable

public class UsersDbContext : DbContext
{
    public UsersDbContext(DbContextOptions<FarmersDbContext> contextOptions)
        : base(contextOptions) {}

    public DbSet<User> Users { get; set; }

    public DbSet<CertRequest> CertRequests { get; set; }

    public DbSet<Certificate> Certificates { get; set; }

    
}