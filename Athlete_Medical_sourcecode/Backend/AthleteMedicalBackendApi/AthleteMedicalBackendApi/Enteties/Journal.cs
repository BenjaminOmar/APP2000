using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Journal
{
    public int JournalId { get; set; }

    public int PatientId { get; set; }

    public virtual ICollection<Journalnote> Journalnotes { get; } = new List<Journalnote>();

    public virtual User Patient { get; set; } = null!;
}
