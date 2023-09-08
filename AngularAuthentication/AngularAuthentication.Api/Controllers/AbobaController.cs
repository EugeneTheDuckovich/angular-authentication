using AngularAuthentication.Api.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularAuthentication.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AbobaController : ControllerBase
{
    [Authorize]
    [HttpGet]
    [Route("aboba")]
    public async Task<IActionResult> Aboba()
    {
        return Ok(new Response<string>
        {
            Result = "Aboba"
        });
    }
}