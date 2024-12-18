using System.Text.Json.Serialization;
using api.Models;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace api;

public class Program
{
    public static void Main(string[] args)
    {
        Env.Load();

        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

        builder.Services.AddCors(o =>
        {
            o.AddPolicy("AllowDevClient", policy =>
            {
                policy.WithOrigins(
                    "http://localhost:5173"
                )
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
            });

            o.AddPolicy("AllowProdClient", p =>
            {
                p.WithOrigins(
                    "https://mythical-dispute.duckdns.org",
                    "http://mythical-dispute.duckdns.org"
                ).AllowAnyMethod().AllowAnyHeader().AllowCredentials();
            });
        });

        string dbConfigString = string.Format("Host={0};Database={1};Username={2};password={3};Port={4}", Environment.GetEnvironmentVariable("PG_HOST"), Environment.GetEnvironmentVariable("PG_DB"), Environment.GetEnvironmentVariable("PG_USER"), Environment.GetEnvironmentVariable("PG_PASSWORD"), Environment.GetEnvironmentVariable("PG_PORT") ?? "5432");
        builder.Services.AddDbContext<MythicalDbContext>(options =>
            options.UseNpgsql(dbConfigString));

        // https://www.infoworld.com/article/2336284/how-to-implement-jwt-authentication-in-aspnet-core.html
        builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.Authority = "https://auth.snowse-ts.duckdns.org/realms/Benson/";
                o.Audience = builder.Configuration["Jwt:Audience"];
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true
                };
            });

        // builder.Services.AddAuthorization();


        var app = builder.Build();
        // app.UseHttpsRedirection();

        app.Logger.LogInformation("The API app has started");
        app.Logger.LogInformation($"Allowing Local host: {Environment.GetEnvironmentVariable("ALLOW_LOCALHOST") == "true"}");

        app.UseCors(Environment.GetEnvironmentVariable("ALLOW_LOCALHOST") == "true" ? "AllowDevClient" : "AllowProdClient");

        string pathToImages = Environment.GetEnvironmentVariable("PATH_TO_IMAGES") ?? "/app/images";

        if (!Directory.Exists(pathToImages))
        {
            app.Logger.LogWarning($"{pathToImages} is not a directory that exists");
            Directory.CreateDirectory(pathToImages);
            app.Logger.LogWarning($"{pathToImages} now exists, we created it from scratch");
        }

        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(pathToImages),
            RequestPath = "/api/image"
        });

        app.UseRouting();

        app.UseAuthorization();
        // app.UseAuthorization();

        app.MapGet("/api/health", () => true);
        app.MapControllers();

        app.Run();
    }
}