using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Backend.Data;
using Backend.Models;
using IdentityServer4;
using IdentityModel.Client;

namespace Backend.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly ILogger<AccountController> _logger;
    private readonly UserManager<AppUser> _userManager;
    private readonly IdentityServerTools _tools;
    public AccountController(
        ILogger<AccountController> logger,
        IdentityServerTools tools,
        UserManager<AppUser> userManager)
    {
        _logger = logger;
        _userManager = userManager;
        _tools = tools;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Login([FromBody]LoginVM loginInfo)
    {
        var password = loginInfo.Password;
        var userName = loginInfo.UserName;
        var request = new HttpClient();
        _logger.LogDebug(HttpContext.Request.Host.Value);
        var discover = await request.GetDiscoveryDocumentAsync($"https://{HttpContext.Request.Host.Value}");
        var token = await request.RequestPasswordTokenAsync(new PasswordTokenRequest() {
            Address = discover.TokenEndpoint,
            UserName = userName,
            Password = password,
            ClientSecret = "secret",
            ClientId = "default_client",
            Scope = "api",
        });

        return Ok(new { token = token.AccessToken});
    }

    [HttpPost]
    public async Task<IActionResult> Post(UserVM user)
    {
        var appUser = new AppUser{
            Organization = user.Organization,
            PhoneNumber = user.PhoneNumber,
            UserName = user.UserName,
        };
        var result = await _userManager.CreateAsync(appUser, user.Password);
        if(!result.Succeeded)
            return BadRequest(result.Errors.ToList());
        user.ID = appUser.Id;
        return Ok(user);
    }
}