
namespace Backend.Middleware;

public class ContentTypeSwitchMiddleware 
{
    private readonly RequestDelegate _next;
    public ContentTypeSwitchMiddleware(RequestDelegate next)
        => _next = next;

    public Task Invoke(HttpContext context)
    {
        if(context.Request.Path.Value?.Contains("vxml") ?? false)
            context.Response.ContentType = "application/xml";
        return _next.Invoke(context);
    }

}