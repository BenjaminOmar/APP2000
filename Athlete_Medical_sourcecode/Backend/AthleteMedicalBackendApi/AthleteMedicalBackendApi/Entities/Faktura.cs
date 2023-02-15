using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Faktura
{
    public int FakturaNr { get; set; }

    public DateTime? AvtaleDato { get; set; }

    public int? Sum { get; set; }

    public DateTime? SendtDato { get; set; }

    public string? BetaltDato { get; set; }

    public int BrukerBrukerNr { get; set; }

    public virtual Bruker BrukerBrukerNrNavigation { get; set; } = null!;
}
