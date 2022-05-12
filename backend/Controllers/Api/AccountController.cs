using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly ILogger<AccountController> _logger;
    private readonly UserManager<AppUser> _userManager;
    public AccountController(
        ILogger<AccountController> logger,
        UserManager<AppUser> userManager)
    {
        _logger = logger;
        _userManager = userManager;
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