using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Services;
using Backend.Services.Interfaces;
using Backend.Middleware;
using Microsoft.AspNetCore.Identity;
using IdentityServer4.Models;
using IdentityServer4;
using IdentityServer4.Services;
using DinkToPdf.Contracts;
using DinkToPdf;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<FarmersDbContext>(
    options => { 
        options.UseInMemoryDatabase("MemoryDb");
        options.EnableSensitiveDataLogging(true);
});
builder.Services.AddSingleton<ICorsPolicyService>((container) =>
{
    var logger = container.GetRequiredService<ILogger<DefaultCorsPolicyService>>();
    return new DefaultCorsPolicyService(logger)
    {
        AllowAll = true
    };
});
builder.Services.AddMemoryCache();
builder.Services.AddIdentity<AppUser, IdentityRole<Guid>>(options => { 
    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedAccount = false;
    options.User.RequireUniqueEmail = false;
}).AddEntityFrameworkStores<FarmersDbContext>();
builder.Services.AddIdentityServer(options => {
    options.IssuerUri = "https://seed-cert.azurewebsites.net/";
})
.AddInMemoryIdentityResources(new List<IdentityResource>
{
    new IdentityResources.OpenId(),
    new IdentityResources.Profile(),
})
.AddCorsPolicyService<CorsPolicy>()
.AddInMemoryApiResources(new List<ApiResource>())
.AddInMemoryApiScopes(new List<ApiScope>() {
    new ApiScope("api"),
})
.AddInMemoryClients(new List<Client>() { 
    new Client() {
        ClientId = "default_client",
        ClientSecrets = { new Secret("secret".Sha256()) },
        AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
        AllowedScopes =  { 
            "api", 
            IdentityServerConstants.StandardScopes.OpenId,
            IdentityServerConstants.StandardScopes.Profile,
        },
        AllowedCorsOrigins =
        {
            "https://seed-cert.azurewebsites.net",
            "https://a4de-80-114-138-125.eu.ngrok.io",
        }
    }
})
.AddDeveloperSigningCredential()
.AddAspNetIdentity<AppUser>();
builder.Services.Configure<IdentityOptions>(options => {
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireDigit = false;
});
builder.Services.AddSingleton<IConverter>(new SynchronizedConverter(new PdfTools()));
builder.Services.AddScoped<ICallerService, CallerService>();
builder.Services.AddScoped<ICertService, CertService>();
builder.Services.AddScoped<IFarmerService, FarmerService>();

var app = builder.Build();

using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetService<FarmersDbContext>();
if(context is null) 
    goto JUMP_SEED;
context.Database.EnsureCreated();
var farmer = context.Farmers.Add(new Backend.Models.Farmer() {
    Name = "Adrian",
    PhoneNumber = "123456789",
});
context.Certificates.Add(new Backend.Models.Certificate() {
    FarmerId = farmer.Entity.ID,
    Status = Backend.Models.CertificateStatus.VALID,
    SeedVariety = "Variety",
});

JUMP_SEED:
using var manager = scope.ServiceProvider.GetService<UserManager<AppUser>>();
if (manager is null || context is null) goto JUMP_USER;
_ = manager.CreateAsync(new AppUser() {
    Email ="basic@email.com",
    UserName = "fatima",
    PhoneNumber = "234567890",
    Name = "Fatima",
    Role = "admin",
    Organization = "VU",
}, "whatever").ConfigureAwait(false);

_ = manager.CreateAsync(new AppUser()
{
    Email = "basic@email.com",
    UserName = "Labosem_User",
    PhoneNumber = "234567890",
    Name = "Labosem User",
    Role = "admin",
    Organization = "VU",

}, "Password123@").ConfigureAwait(false);
_ = manager.CreateAsync(new AppUser()
{
    Email = "basic@email.com",
    UserName = "Union_User",
    PhoneNumber = "234567890",
    Name = "Labosem User",
    Role = "admin",
    Organization = "VU",

}, "Password123@").ConfigureAwait(false);

context.SaveChanges();

JUMP_USER:

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    
    app.UseSwagger();
    app.UseSwaggerUI();
} 
else 
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseRouting();

app.UseCors(cors =>
    cors.AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials()
);

app.UseIdentityServer();
app.UseAuthentication();
app.UseAuthorization();

//app.UseMiddleware<ContentTypeSwitchMiddleware>();
app.MapControllers();


app.Run();

public class CorsPolicy : ICorsPolicyService
{
    public Task<bool> IsOriginAllowedAsync(string origin) 
        => Task.FromResult(true);
}