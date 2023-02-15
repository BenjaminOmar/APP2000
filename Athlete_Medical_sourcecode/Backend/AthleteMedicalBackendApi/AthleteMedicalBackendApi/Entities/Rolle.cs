using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Rolle
{
    public int RolleId { get; set; }

    public string? RolleNavn { get; set; }

    public virtual ICollection<Bruker> Brukers { get; } = new List<Bruker>();
}
