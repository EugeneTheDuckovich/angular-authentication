using Newtonsoft.Json;

namespace AngularAuthentication.Api.Models.Responses;

public class Response<T>
{
    [JsonProperty("result")]
    public T Result { get; set; }
    
    [JsonProperty("message")]
    public string? Message { get; set; }
}