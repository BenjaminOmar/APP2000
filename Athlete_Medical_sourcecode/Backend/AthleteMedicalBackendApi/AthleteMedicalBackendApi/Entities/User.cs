using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AthleteMedicalBackendApi.Entities;

public partial class User
{
    public int UserId { get; set; }

    public string? FirstName { get; set; } 

    public string? MiddleName { get; set; }

    public string? LastName { get; set; }

    public int PhoneNumber { get; set; }

    public int SocialSecurityNum { get; set; }

    public string? Adress { get; set; }

    public int ZipCode { get; set; }

    public int RoleId { get; set; }

    public string? Password { get; set; }

    public DateTime RegDate { get; set; }

    public string Username { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Appointment> AppointmentPatients { get; } = new List<Appointment>();
    [JsonIgnore]
    public virtual ICollection<Appointment> AppointmentSpecialists { get; } = new List<Appointment>();
    [JsonIgnore]
    public virtual ICollection<Invoice> Invoices { get; } = new List<Invoice>();
    [JsonIgnore]
    public virtual ICollection<Journalnote> Journalnotes { get; } = new List<Journalnote>();
    [JsonIgnore]
    public virtual ICollection<Journal> Journals { get; } = new List<Journal>();
    [JsonIgnore]
    public virtual ICollection<Role> Role { get; } = new List<Role>();
    [JsonIgnore]
    public virtual ICollection<City> ZipCodeNavigation { get; } = new List<City>();
}
