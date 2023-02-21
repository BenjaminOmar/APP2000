using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AthleteMedicalBackendApi.Entities;

public partial class App2000Context : DbContext
{
    public App2000Context()
    {
    }

    public App2000Context(DbContextOptions<App2000Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<Journal> Journals { get; set; }

    public virtual DbSet<Journalnote> Journalnotes { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PRIMARY");

            entity.ToTable("appointment");

            entity.HasIndex(e => e.PatientId, "fk_avtale_bruker1_idx");

            entity.HasIndex(e => e.SpecialistId, "fk_avtale_bruker2_idx");

            entity.HasIndex(e => e.RoomId, "fk_avtale_rom1_idx");

            entity.Property(e => e.AppointmentId)
                .HasColumnType("int(11)")
                .HasColumnName("appointmentId");
            entity.Property(e => e.EndTime)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("datetime")
                .HasColumnName("endTime");
            entity.Property(e => e.PatientId)
                .HasColumnType("int(11)")
                .HasColumnName("patientId");
            entity.Property(e => e.RoomId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("roomId");
            entity.Property(e => e.SpecialistId)
                .HasColumnType("int(11)")
                .HasColumnName("specialistId");
            entity.Property(e => e.StartTime)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("datetime")
                .HasColumnName("startTime");

            entity.HasOne(d => d.Patient).WithMany(p => p.AppointmentPatients)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_avtale_bruker1");

            entity.HasOne(d => d.Room).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.RoomId)
                .HasConstraintName("fk_avtale_rom1");

            entity.HasOne(d => d.Specialist).WithMany(p => p.AppointmentSpecialists)
                .HasForeignKey(d => d.SpecialistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_avtale_bruker2");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.ZipCode).HasName("PRIMARY");

            entity.ToTable("city");

            entity.Property(e => e.ZipCode)
                .HasColumnType("int(11)")
                .HasColumnName("zipCode");
            entity.Property(e => e.CityName)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("cityName");
        });

        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.HasKey(e => e.InvoiceId).HasName("PRIMARY");

            entity.ToTable("invoice");

            entity.HasIndex(e => e.UserId, "fk_faktura_bruker1_idx");

            entity.Property(e => e.InvoiceId)
                .HasColumnType("int(11)")
                .HasColumnName("invoiceId");
            entity.Property(e => e.AgreementDate)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("agreementDate");
            entity.Property(e => e.PaidDate)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("paidDate");
            entity.Property(e => e.SendtDate)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("sendtDate");
            entity.Property(e => e.Sum)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("sum");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("userId");

            entity.HasOne(d => d.User).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_faktura_bruker1");
        });

        modelBuilder.Entity<Journal>(entity =>
        {
            entity.HasKey(e => e.JournalId).HasName("PRIMARY");

            entity.ToTable("journal");

            entity.HasIndex(e => e.PatientId, "fk_Journal_bruker1_idx");

            entity.Property(e => e.JournalId)
                .HasColumnType("int(11)")
                .HasColumnName("journalId");
            entity.Property(e => e.PatientId)
                .HasColumnType("int(11)")
                .HasColumnName("patientId");

            entity.HasOne(d => d.Patient).WithMany(p => p.Journals)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Journal_bruker1");
        });

        modelBuilder.Entity<Journalnote>(entity =>
        {
            entity.HasKey(e => e.JournalnoteId).HasName("PRIMARY");

            entity.ToTable("journalnote");

            entity.HasIndex(e => e.JournalId, "fk_journalnotat_Journal1_idx");

            entity.HasIndex(e => e.SpecialistId, "fk_journalnotat_bruker1_idx");

            entity.Property(e => e.JournalnoteId)
                .HasColumnType("int(11)")
                .HasColumnName("journalnoteId");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.Heading)
                .HasMaxLength(150)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("heading");
            entity.Property(e => e.JournalId)
                .HasColumnType("int(11)")
                .HasColumnName("journalId");
            entity.Property(e => e.Journalnote1)
                .HasMaxLength(3000)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("journalnote");
            entity.Property(e => e.SpecialistId)
                .HasColumnType("int(11)")
                .HasColumnName("specialistId");
            entity.Property(e => e.Time)
                .HasColumnType("time")
                .HasColumnName("time");

            entity.HasOne(d => d.Journal).WithMany(p => p.Journalnotes)
                .HasForeignKey(d => d.JournalId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_journalnotat_Journal1");

            entity.HasOne(d => d.Specialist).WithMany(p => p.Journalnotes)
                .HasForeignKey(d => d.SpecialistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_journalnotat_bruker1");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.RoleId)
                .HasColumnType("int(11)")
                .HasColumnName("roleId");
            entity.Property(e => e.RoleName)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("roleName");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PRIMARY");

            entity.ToTable("room");

            entity.Property(e => e.RoomId)
                .HasColumnType("int(11)")
                .HasColumnName("roomId");
            entity.Property(e => e.RoomName)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("roomName");
            entity.Property(e => e.Seats)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("seats");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "Email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.ZipCode, "fk_bruker_poststed_idx");

            entity.HasIndex(e => e.RoleId, "fk_bruker_rolle1_idx");

            entity.HasIndex(e => e.PhoneNumber, "phoneNumber_UNIQUE").IsUnique();

            entity.HasIndex(e => e.SocialSecurityNum, "socialSecurityNum_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Username, "username_UNIQUE").IsUnique();

            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("userId");
            entity.Property(e => e.Adress)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("adress");
            entity.Property(e => e.Email)
                .HasMaxLength(60)
                .HasColumnName("email");
            entity.Property(e => e.FirstName).HasMaxLength(45);
            entity.Property(e => e.LastName)
                .HasMaxLength(70)
                .HasColumnName("lastName");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("middleName");
            entity.Property(e => e.Password)
                .HasMaxLength(70)
                .HasColumnName("password");
            entity.Property(e => e.PhoneNumber)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("phoneNumber");
            entity.Property(e => e.RegDate)
                .HasColumnType("datetime")
                .HasColumnName("regDate");
            entity.Property(e => e.RoleId)
                .HasColumnType("int(11)")
                .HasColumnName("roleId");
            entity.Property(e => e.SocialSecurityNum)
                .HasColumnType("int(11)")
                .HasColumnName("socialSecurityNum");
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .HasColumnName("username");
            entity.Property(e => e.ZipCode)
                .HasColumnType("int(11)")
                .HasColumnName("zipCode");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
