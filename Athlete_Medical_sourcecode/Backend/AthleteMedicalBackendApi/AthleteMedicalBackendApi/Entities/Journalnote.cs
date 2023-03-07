using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Journalnote
{
    public int JournalnoteId { get; set; }

    public string? Journalnote1 { get; set; }

    public string? Heading { get; set; }

    public DateTime Created { get; set; }

    public int Patient { get; set; }

    public virtual User PatientNavigation { get; set; } = null!;
}
