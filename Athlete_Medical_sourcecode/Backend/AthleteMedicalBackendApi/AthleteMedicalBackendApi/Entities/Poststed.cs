using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Poststed
{
    public int PostNr { get; set; }

    public string? PostSted1 { get; set; }

    public virtual ICollection<Bruker> Brukers { get; } = new List<Bruker>();
}
