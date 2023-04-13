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

    public virtual DbSet<AppointmentGetAll> AppointmentsGetAll { get; set; }

    public virtual DbSet<AppointmentGetById> AppointmentGetByIds { get; set; }

    public virtual DbSet<JournalnoteGetAll> JournalNoteGetAll { get; set; }

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
            entity.Property(e => e.IsAvailable)
                .HasColumnType("tinyint(4)")
                .HasColumnName("isAvailable");
            entity.Property(e => e.PatientId)
                .HasDefaultValueSql("'NULL'")
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
                .HasConstraintName("fk_avtale_bruker1");

            entity.HasOne(d => d.Room).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.RoomId)
                .HasConstraintName("fk_avtale_rom1");

            entity.HasOne(d => d.Specialist).WithMany(p => p.AppointmentSpecialists)
                .HasForeignKey(d => d.SpecialistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_avtale_bruker2");
        });

        
        modelBuilder.Entity<Journalnote>(entity =>
        {
            entity.HasKey(e => e.JournalnoteId).HasName("PRIMARY");

            entity.ToTable("journalnote");

            entity.HasIndex(e => e.Patient, "fk_journalnote_user1_idx");

            entity.Property(e => e.JournalnoteId)
                .HasColumnType("int(11)")
                .HasColumnName("journalnoteId");
            entity.Property(e => e.Created)
                .HasColumnType("datetime")
                .HasColumnName("created");
            entity.Property(e => e.Heading)
                .HasMaxLength(150)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("heading");
            entity.Property(e => e.Journalnote1)
                .HasMaxLength(3000)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("journalnote");
            entity.Property(e => e.Patient)
                .HasColumnType("int(11)")
                .HasColumnName("patient");

            entity.HasOne(d => d.PatientNavigation).WithMany(p => p.Journalnotes)
                .HasForeignKey(d => d.Patient)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_journalnote_user1");
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
                .HasMaxLength(11)
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
