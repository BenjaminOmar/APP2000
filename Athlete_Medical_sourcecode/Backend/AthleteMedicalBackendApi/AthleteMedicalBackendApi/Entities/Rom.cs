using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Rom
{
    public int RomNr { get; set; }

    public string? RomNavn { get; set; }

    public int? SittePlasser { get; set; }

    public virtual ICollection<Avtale> Avtales { get; } = new List<Avtale>();
}
