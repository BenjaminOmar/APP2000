using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Bruker
{
    public int BrukerNr { get; set; }

    public string Fornavn { get; set; } = null!;

    public string? MellomNavn { get; set; }

    public string Etternavn { get; set; } = null!;

    public int? TlfNr { get; set; }

    public int FødselNr { get; set; }

    public string? Adresse { get; set; } 

    public int PostNr { get; set; }

    public int RolleId { get; set; }

    public string? Passord { get; set; }

    public DateTime RegistrertDato { get; set; }

    public virtual ICollection<Avtale> AvtaleBehandlerNrNavigations { get; } = new List<Avtale>();

    public virtual ICollection<Avtale> AvtalePasientNrNavigations { get; } = new List<Avtale>();

    public virtual ICollection<Faktura> Fakturas { get; } = new List<Faktura>();

    public virtual ICollection<Journalnotat> Journalnotats { get; } = new List<Journalnotat>();

    public virtual ICollection<Journal> Journals { get; } = new List<Journal>();

    public virtual Poststed PostNrNavigation { get; set; } = null!;

    public virtual Rolle Rolle { get; set; } = null!;
}
