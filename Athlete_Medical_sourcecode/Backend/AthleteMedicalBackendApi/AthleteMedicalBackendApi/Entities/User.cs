using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AthleteMedicalBackendApi.Entities;

public partial class User
{
    public int UserId { get; set; }

    public string? FirstName { get; set; } = null!;

    public string? MiddleName { get; set; }

    public string? LastName { get; set; } = null!;

    public int PhoneNumber { get; set; }

    public string? SocialSecurityNum { get; set; } = null!;

    public string? Adress { get; set; }

    public int ZipCode { get; set; }

    public int RoleId { get; set; }

    public string Password { get; set; } = null!;

    public DateTime RegDate { get; set; }

    public string Username { get; set; } = null!;

    public string? Email { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Appointment> AppointmentPatients { get; } = new List<Appointment>();
    [JsonIgnore]
    public virtual ICollection<Appointment> AppointmentSpecialists { get; } = new List<Appointment>();
    [JsonIgnore]
    public virtual ICollection<Invoice> Invoices { get; } = new List<Invoice>();
    [JsonIgnore]
    public virtual ICollection<Journalnote> Journalnotes { get; } = new List<Journalnote>();
    [JsonIgnore]
    public virtual ICollection<Role> Role { get; } = new List<Role>();

}

