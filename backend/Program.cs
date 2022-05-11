using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Services;
using Backend.Services.Interfaces;
using Backend.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<FarmersDbContext>(
    options => { 
        options.UseInMemoryDatabase("MemoryDb");
        options.EnableSensitiveDataLogging(true);
});
builder.Services.AddScoped<ICallerService, CallerService>();
builder.Services.AddScoped<ICertService, CertService>();
builder.Services.AddScoped<IFarmerService, FarmerService>();

var app = builder.Build();

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

app.UseRouting();

app.UseCors(cors => 
    cors.AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials()
);

app.UseAuthorization();
app.UseMiddleware<ContentTypeSwitchMiddleware>();
app.MapControllers();


app.Run();