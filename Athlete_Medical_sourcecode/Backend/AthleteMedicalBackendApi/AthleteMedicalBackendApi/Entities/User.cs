using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class User
{
    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string? MiddleName { get; set; }

    public string LastName { get; set; } = null!;

    public int? PhoneNumber { get; set; }

    public int SocialSecurityNum { get; set; }

    public string? Adress { get; set; }

    public int ZipCode { get; set; }

    public int RoleId { get; set; }

    public string? Password { get; set; }

    public DateTime RegDate { get; set; }

    public virtual ICollection<Appointment> AppointmentPatients { get; } = new List<Appointment>();

    public virtual ICollection<Appointment> AppointmentSpecialists { get; } = new List<Appointment>();

    public virtual ICollection<Invoice> Invoices { get; } = new List<Invoice>();

    public virtual ICollection<Journalnote> Journalnotes { get; } = new List<Journalnote>();

    public virtual ICollection<Journal> Journals { get; } = new List<Journal>();

    public virtual Role Role { get; set; } = null!;

    public virtual City ZipCodeNavigation { get; set; } = null!;
}
