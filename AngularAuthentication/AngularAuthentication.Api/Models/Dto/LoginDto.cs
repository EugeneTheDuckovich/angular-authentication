using System.ComponentModel.DataAnnotations;

namespace AngularAuthentication.Api.Models.Dto;

public class LoginDto
{
    [Required(ErrorMessage = "username is needed!")]
    public string UserName { get; set; }
    
    [Required(ErrorMessage = "password is needed!")]
    public string Password { get; set; }
}