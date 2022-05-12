
namespace Backend.Middleware;

public class ContentTypeSwitchMiddleware 
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ContentTypeSwitchMiddleware> _logger;
    public ContentTypeSwitchMiddleware(
        ILogger<ContentTypeSwitchMiddleware> logger,
        RequestDelegate next)
    {
        _logger = logger;
        _next = next;
    }

    public Task Invoke(HttpContext context)
    {
        if(context.Request.Path.Value?.Contains("vxml") ?? false){
            _logger.LogDebug("Changing content type");
            context.Response.ContentType = "application/xml";
        }
        return _next.Invoke(context);
    }

}