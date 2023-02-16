using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Room
{
    public int RoomId { get; set; }

    public string? RoomName { get; set; }

    public int? Seats { get; set; }

    public virtual ICollection<Appointment> Appointments { get; } = new List<Appointment>();
}
