using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Journal
{
    public int JournalNr { get; set; }

    public int PasientNr { get; set; }

    public virtual ICollection<Journalnotat> Journalnotats { get; } = new List<Journalnotat>();

    public virtual Bruker PasientNrNavigation { get; set; } = null!;
}
