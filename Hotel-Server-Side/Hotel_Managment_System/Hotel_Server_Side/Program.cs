using HotelDataAceess.Settings;
using HotelBussinse.Mappers;
using HotelBussinse.Services.Implements;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;
using HotelDataAceess.Repository;
using HotelDataAceess.Repository.Interfaces;
using HotelDataAceess.Repository.Implements;
using HotelDataAceess.UnitOfWork;


Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


builder.Services.AddDbContext<HotelDbContext>(options =>
        options
        .UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
    var jwtSettings = builder.Configuration.GetSection("JWT");
    var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

    options.RequireHttpsMetadata = false;
    options.SaveToken = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
    };
     });


    //Serilog
    builder.Host.UseSerilog((context, loggerConfiguration) =>
{
    loggerConfiguration.WriteTo.Console();
    loggerConfiguration.ReadFrom.Configuration(context.Configuration);
});


// Add AutoMapper services
{
    builder.Services.AddAutoMapper(typeof(PersonMapper).Assembly);
}


// Add Entity Services
{
    builder.Services.AddScoped<IPersonRepository, PersonRepository>();
    builder.Services.AddScoped<IPersonService, PersonService>();
    builder.Services.AddScoped<ICountryRepositry, CountryRepositry>();
    builder.Services.AddScoped<ICountryService, CountryService>();
    builder.Services.AddScoped<IBookingRepositry, BookingRepositry>();
    builder.Services.AddScoped<IBookingService, BookingService>();
    builder.Services.AddScoped<IPaymentRepositry, PaymentRepositry>();
    builder.Services.AddScoped<IPaymentService, PaymentService>();
    builder.Services.AddScoped<IRoomRepositry, RoomRepositry>();
    builder.Services.AddScoped<IRoomService, RoomService>();
    builder.Services.AddScoped<IRoomTypeRepositry, RoomTypeRepositry>();
    builder.Services.AddScoped<IRoomTrypeService, RoomTypeService>();
    builder.Services.AddScoped<IUserRepository, UserRepository>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<IAuthRepositry, AuthRepositry>();
    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
    builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));


}

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ≈÷«›… CORS ﬁ»· »‰«¡ «· ÿ»Ìﬁ
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// «” Œœ«„ CORS middleware ﬁ»· «·»«ﬁÌ
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication(); 

app.UseAuthorization();

app.MapControllers();

app.Run();

