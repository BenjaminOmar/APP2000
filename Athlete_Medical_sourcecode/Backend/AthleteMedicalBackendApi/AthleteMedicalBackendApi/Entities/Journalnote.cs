using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Journalnote
{
    public int JournalnoteId { get; set; }

    public DateTime Date { get; set; }

    public TimeSpan Time { get; set; }

    public int JournalId { get; set; }

    public int SpecialistId { get; set; }

    public string? Journalnote1 { get; set; }

    public string? Heading { get; set; }

    public virtual Journal Journal { get; set; } = null!;

    public virtual User Specialist { get; set; } = null!;
}
