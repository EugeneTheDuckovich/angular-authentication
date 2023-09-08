using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace AngularAuthentication.Api.Models.Dto;

public class RegisterDto
{
    [Required(ErrorMessage = "username is needed!")]
    public string UserName { get; set; }
    
    [EmailAddress]
    [Required(ErrorMessage = "email is needed!")]
    public string Email { get; set; }
    
    [Required(ErrorMessage = "password is needed!")]
    public string Password { get; set; }
}