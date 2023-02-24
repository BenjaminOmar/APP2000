using AthleteMedicalBackendApi.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<App2000Context>(
    o => o.UseMySQL(builder.Configuration.GetConnectionString("athleteMedical")!));

builder.Services.AddCors(setup =>
{
    setup.AddDefaultPolicy(policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:3000")
        .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

//app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

