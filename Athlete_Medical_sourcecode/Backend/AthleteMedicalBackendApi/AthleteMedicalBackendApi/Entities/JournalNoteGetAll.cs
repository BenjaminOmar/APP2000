using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace AthleteMedicalBackendApi.Entities;

[Keyless]
public partial class JournalnoteGetAll
{
    public int JournalnoteId { get; set; }

    public string? Journalnote { get; set; }

    public string? Heading { get; set; }

    public DateTime Created { get; set; }

    public int Patient { get; set; }

    public string? Name { get; set; }

    //[JsonIgnore]
    //public virtual User? PatientNavigation { get; set; }
}

