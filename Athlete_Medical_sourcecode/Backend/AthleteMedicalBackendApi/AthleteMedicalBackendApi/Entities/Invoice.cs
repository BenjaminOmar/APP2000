using System;
using System.Collections.Generic;

namespace AthleteMedicalBackendApi.Entities;

public partial class Invoice
{
    public int InvoiceId { get; set; }

    public DateTime? AgreementDate { get; set; }

    public int? Sum { get; set; }

    public DateTime? SendtDate { get; set; }

    public string? PaidDate { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
}
