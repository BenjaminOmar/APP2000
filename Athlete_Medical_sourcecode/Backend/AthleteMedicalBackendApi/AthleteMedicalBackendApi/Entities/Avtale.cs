using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Avtale
{
    public int AvtaleNr { get; set; }

    public DateTime? TidStart { get; set; }

    public DateTime? TidSlutt { get; set; }

    public int? RomNr { get; set; }

    public int PasientNr { get; set; }

    public int BehandlerNr { get; set; }

    public virtual Bruker BehandlerNrNavigation { get; set; } = null!;

    public virtual Bruker PasientNrNavigation { get; set; } = null!;

    public virtual Rom? RomNrNavigation { get; set; }
}
