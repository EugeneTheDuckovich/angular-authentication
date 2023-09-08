using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using AngularAuthentication.Api.Constants;
using AngularAuthentication.Api.Models.Dto;
using AngularAuthentication.Api.Models.Responses;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;

namespace AngularAuthentication.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;

    public AccountController(UserManager<IdentityUser> userManager, 
        RoleManager<IdentityRole> roleManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        await InitializeRoles();
        
        bool userExists = await _userManager.FindByNameAsync(registerDto.UserName) is not null;
        if (userExists)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response<string>
                {
                    Result = "Error",
                    Message = "user already exists!"
                });
        }

        var user = new IdentityUser
        {
            Email = registerDto.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = registerDto.UserName
        };
        
        var result = await _userManager.CreateAsync(user, registerDto.Password);
        await _userManager.AddToRoleAsync(user, UserRoles.User);


        if (!result.Succeeded)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response<string>
            {
                Result = "Error",
                Message = "user registration failed!"
            });
        }

        return await Login(new LoginDto
        {
            UserName = registerDto.UserName,
            Password = registerDto.Password
        });
    }

    [HttpPost]
    [Route("register-admin")]
    public async Task<IActionResult> RegisterAdmin([FromBody] RegisterDto registerDto)
    {
        await InitializeRoles();
        
        bool userExists = await _userManager.FindByNameAsync(registerDto.UserName) is not null;
        if (userExists)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response<string>
            {
                Result = "Error",
                Message = "user already exists!"
            });
        }

        var user = new IdentityUser
        {
            Email = registerDto.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = registerDto.UserName
        };
        
        var result = await _userManager.CreateAsync(user,registerDto.Password);
        await _userManager.AddToRoleAsync(user, UserRoles.User);
        await _userManager.AddToRoleAsync(user, UserRoles.Admin);


        if (!result.Succeeded)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response<string>
            {
                Result = "Error",
                Message = "user registration failed!"
            });
        }
        
        return Ok(new Response<string>
        {
            Result = "Success",
            Message = $"Admin {registerDto.UserName} was registered!"
        });
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        await InitializeRoles();
        IdentityUser? user = await _userManager.FindByNameAsync(loginDto.UserName);
        
        if(user is null || !(await _userManager.CheckPasswordAsync(user,loginDto.Password)))
            return Unauthorized();

        var authenticationClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, loginDto.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };
        
        IList<string> userRoles = (await _userManager.GetRolesAsync(user));

        foreach (var role in userRoles)
        {
            authenticationClaims.Add(new Claim(ClaimTypes.Role,role));
        }

        var token = GetToken(authenticationClaims);
        
        return Ok(new AuthenticationResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token)
        });
    }

    private JwtSecurityToken GetToken(List<Claim> authenticationClaims)
    {
        var signingKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"] ?? string.Empty));

        var token = new JwtSecurityToken(
            expires: DateTime.Now.AddHours(3),
            claims: authenticationClaims,
            signingCredentials: new SigningCredentials(signingKey,SecurityAlgorithms.HmacSha256)
            );

        return token;
    }

    private async Task InitializeRoles()
    {
        bool userRoleExists = await _roleManager.RoleExistsAsync(UserRoles.User);
        if (!userRoleExists)
        {
            await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));
        }
        
        bool adminRoleExists = await _roleManager.RoleExistsAsync(UserRoles.Admin);
        if (!adminRoleExists)
        {
            await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
        }
    }
}