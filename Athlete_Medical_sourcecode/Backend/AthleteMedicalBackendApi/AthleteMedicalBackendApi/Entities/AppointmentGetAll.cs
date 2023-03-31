using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace AthleteMedicalBackendApi.Entities;

[Keyless]
public partial class AppointmentGetAll
{
    public int AppointmentId { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public int? RoomId { get; set; }

    public int? PatientId { get; set; }

    public int SpecialistId { get; set; }

    public sbyte IsAvailable { get; set; }

    public string? Name { get; set; }

    [JsonIgnore]
    public virtual User? Patient { get; set; }
    [JsonIgnore]
    public virtual Room? Room { get; set; }
    [JsonIgnore]
    public virtual User? Specialist { get; set; }
}