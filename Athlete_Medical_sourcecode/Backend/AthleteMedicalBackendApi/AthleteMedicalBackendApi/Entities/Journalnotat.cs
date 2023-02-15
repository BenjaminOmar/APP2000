using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Journalnotat
{
    public int JournalnotatNr { get; set; }

    public DateTime Dato { get; set; }

    public TimeSpan Tid { get; set; }

    public int JournalNr { get; set; }

    public int BehandlerNr { get; set; }

    public string? Journalnotat1 { get; set; }

    public string? Overskrift { get; set; }

    public virtual Bruker BehandlerNrNavigation { get; set; } = null!;

    public virtual Journal JournalNrNavigation { get; set; } = null!;
}
