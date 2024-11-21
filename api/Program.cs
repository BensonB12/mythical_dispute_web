using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            });

        builder.Services.AddCors();

        string dbConfigString = string.Format("Host={0};Database={1};Username={2};password={3};Port={4}", builder.Configuration["PG_HOST"], builder.Configuration["PG_DB"], builder.Configuration["PG_USER"], builder.Configuration["PG_PASSWORD"], builder.Configuration["PG_PORT"] ?? "5432");
        builder.Services.AddDbContext<DbContext>(options =>
            options.UseNpgsql(dbConfigString));

        // https://www.infoworld.com/article/2336284/how-to-implement-jwt-authentication-in-aspnet-core.html
        // builder.Services.AddAuthentication(options =>
        //     {
        //     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        //     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        //     options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        // }).AddJwtBearer(o =>
        // {
        //     o.TokenValidationParameters = new TokenValidationParameters
        //     {
        //         ValidIssuer = builder.Configuration["Jwt:Issuer"],
        //         ValidAudience = builder.Configuration["Jwt:Audience"],
        //         // IssuerSigningKey = new SymmetricSecurityKey
        //         // (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        //         ValidateIssuer = true,
        //         ValidateAudience = true,
        //         ValidateLifetime = false,
        //         ValidateIssuerSigningKey = true
        //     };
        // });


        var app = builder.Build();
        // app.UseHttpsRedirection();

        app.Logger.LogInformation("The API app has started");

        app.UseCors(c =>
                c.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin()
            );

        string pathToImages = app.Configuration["PATH_TO_IMAGES"] ?? "/app/images";

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

        app.MapGet("/api/health", () => true);
        app.MapControllers();

        app.Run();
    }
}