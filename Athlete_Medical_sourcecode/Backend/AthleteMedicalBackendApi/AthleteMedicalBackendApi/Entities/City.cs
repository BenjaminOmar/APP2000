using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class City
{
    public int ZipCode { get; set; }

    public string? CityName { get; set; }

    public virtual ICollection<User> Users { get; } = new List<User>();
}
