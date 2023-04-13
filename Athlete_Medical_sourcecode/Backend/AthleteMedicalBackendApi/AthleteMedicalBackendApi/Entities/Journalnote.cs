using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AthleteMedicalBackendApi.Entities;

public partial class Journalnote
{
    public int JournalnoteId { get; set; }

    public string? Journalnote1 { get; set; }

    public string? Heading { get; set; }

    public DateTime Created { get; set; }

    public int Patient { get; set; }

    public int Specialist { get; set; }

    [JsonIgnore]
    public virtual User? PatientNavigation { get; set; }

    [JsonIgnore]
    public virtual User? SpecialistNavigation { get; set; }
}
