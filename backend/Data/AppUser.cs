using Microsoft.AspNetCore.Identity;

namespace Backend.Data;

public class AppUser : IdentityUser<Guid> {
    public string? Organization { get; set; }
    
    public string? Name { get; set; }

    public string? Role { get; set; }
}