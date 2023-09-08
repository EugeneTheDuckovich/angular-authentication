using Newtonsoft.Json;

namespace AngularAuthentication.Api.Models.Responses;

public class AuthenticationResponse
{
    [JsonProperty("token")]
    public string Token { get; set; }
}