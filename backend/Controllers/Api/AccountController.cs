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
    private readonly IHttpClientFactory _httpClientFactory;
    public AccountController(
        ILogger<AccountController> logger,
        IHttpClientFactory httpClientFactory,
        UserManager<AppUser> userManager)
    {
        _logger = logger;
        _userManager = userManager;
        _httpClientFactory = httpClientFactory;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Login([FromBody]LoginVM loginInfo)
    {
        var password = loginInfo.Password;
        var userName = loginInfo.UserName;
        var request = _httpClientFactory.CreateClient();
        //HttpContext.SignInAsync(new IdentityServerUser())
        var discover = await request.GetDiscoveryDocumentAsync($"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}");
        //var discover = await request.GetDiscoveryDocumentAsync($"http://localhost:5031/");
        var tokenTask = request.RequestPasswordTokenAsync(new PasswordTokenRequest() {
            Address = discover.TokenEndpoint,
            UserName = userName,
            Password = password,
            ClientSecret = "secret",
            ClientId = "default_client",
            Scope = "api openid profile",
        });

        var user = await _userManager.FindByNameAsync(loginInfo.UserName);
        var outputUser = new OutUserVM
        {
            FirstName = user.Name,
            UserName = user.UserName,
            ID = user.Id,
            Organization = user.Organization,
            Role = user.Role,
            PhoneNumber = user.PhoneNumber
        };
        var token = await tokenTask;

        return Ok(new { token = token.AccessToken, user = outputUser });
    }

    [HttpPost]
    public async Task<IActionResult> Post(UserVM user)
    {
        var appUser = new AppUser {
            Organization = user.Organization,
            PhoneNumber = user.PhoneNumber,
            UserName = user.UserName,
            Name = user.FirstName,
            Role = user.Role,
        };
        var result = await _userManager.CreateAsync(appUser, user.Password);
        if(!result.Succeeded)
            return BadRequest(result.Errors.ToList());
        user.ID = appUser.Id;
        return Ok(user);
    }
}
