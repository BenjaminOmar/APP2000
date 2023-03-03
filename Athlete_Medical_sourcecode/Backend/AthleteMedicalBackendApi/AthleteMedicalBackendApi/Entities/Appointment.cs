using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Appointment
{
    public int AppointmentId { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public int? RoomId { get; set; }

    public int? PatientId { get; set; }

    public int SpecialistId { get; set; }

    public sbyte IsAvailable { get; set; }

    public virtual User? Patient { get; set; }

    public virtual Room? Room { get; set; }

    public virtual User Specialist { get; set; } = null!;
}
