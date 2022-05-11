using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Controllers.Api;

[Route ("api/[controller]")]
[ApiController]
public class UserController : ControllerBase {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly ICertService _certService;
        public UserController(
            ILogger<UserController> logger,
            IUserService userService,
            ICertService certService
        ){        
            _logger = logger;
            _userService = userService;
            _certService = certService;
        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody]UserVM user)
        {
            _logger.LogDebug("Received farmer", user);
            var newUser = await _userService.CreateUser(user);
            return CreatedAtAction(null, newUser.UserID, newUser);
        }
}