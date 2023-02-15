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

    public virtual DbSet<Avtale> Avtales { get; set; }

    public virtual DbSet<Bruker> Brukers { get; set; }

    public virtual DbSet<Faktura> Fakturas { get; set; }

    public virtual DbSet<Journal> Journals { get; set; }

    public virtual DbSet<Journalnotat> Journalnotats { get; set; }

    public virtual DbSet<Poststed> Poststeds { get; set; }

    public virtual DbSet<Rolle> Rolles { get; set; }

    public virtual DbSet<Rom> Roms { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;port=3307;user=root;password=;database=app2000");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Avtale>(entity =>
        {
            entity.HasKey(e => e.AvtaleNr).HasName("PRIMARY");

            entity.ToTable("avtale");

            entity.HasIndex(e => e.PasientNr, "fk_avtale_bruker1_idx");

            entity.HasIndex(e => e.BehandlerNr, "fk_avtale_bruker2_idx");

            entity.HasIndex(e => e.RomNr, "fk_avtale_rom1_idx");

            entity.Property(e => e.AvtaleNr)
                .HasColumnType("int(11)")
                .HasColumnName("avtaleNr");
            entity.Property(e => e.BehandlerNr)
                .HasColumnType("int(11)")
                .HasColumnName("behandlerNr");
            entity.Property(e => e.PasientNr)
                .HasColumnType("int(11)")
                .HasColumnName("pasientNr");
            entity.Property(e => e.RomNr)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("romNr");
            entity.Property(e => e.TidSlutt)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("datetime")
                .HasColumnName("tidSlutt");
            entity.Property(e => e.TidStart)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("datetime")
                .HasColumnName("tidStart");

            entity.HasOne(d => d.BehandlerNrNavigation).WithMany(p => p.AvtaleBehandlerNrNavigations)
                .HasForeignKey(d => d.BehandlerNr)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_avtale_bruker2");

            entity.HasOne(d => d.PasientNrNavigation).WithMany(p => p.AvtalePasientNrNavigations)
                .HasForeignKey(d => d.PasientNr)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_avtale_bruker1");

            entity.HasOne(d => d.RomNrNavigation).WithMany(p => p.Avtales)
                .HasForeignKey(d => d.RomNr)
                .HasConstraintName("fk_avtale_rom1");
        });

        modelBuilder.Entity<Bruker>(entity =>
        {
            entity.HasKey(e => e.BrukerNr).HasName("PRIMARY");

            entity.ToTable("bruker");

            entity.HasIndex(e => e.PostNr, "fk_bruker_poststed_idx");

            entity.HasIndex(e => e.RolleId, "fk_bruker_rolle1_idx");

            entity.Property(e => e.BrukerNr)
                .HasColumnType("int(11)")
                .HasColumnName("brukerNr");
            entity.Property(e => e.Adresse)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("adresse");
            entity.Property(e => e.Etternavn)
                .HasMaxLength(70)
                .HasColumnName("etternavn");
            entity.Property(e => e.Fornavn)
                .HasMaxLength(45)
                .HasColumnName("fornavn");
            entity.Property(e => e.FødselNr)
                .HasColumnType("int(11)")
                .HasColumnName("fødselNr");
            entity.Property(e => e.MellomNavn)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("mellomNavn");
            entity.Property(e => e.Passord)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("passord");
            entity.Property(e => e.PostNr)
                .HasColumnType("int(11)")
                .HasColumnName("postNr");
            entity.Property(e => e.RegistrertDato)
                .HasColumnType("datetime")
                .HasColumnName("registrertDato");
            entity.Property(e => e.RolleId)
                .HasColumnType("int(11)")
                .HasColumnName("rolleId");
            entity.Property(e => e.TlfNr)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("tlfNr");

            entity.HasOne(d => d.PostNrNavigation).WithMany(p => p.Brukers)
                .HasForeignKey(d => d.PostNr)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_bruker_poststed");

            entity.HasOne(d => d.Rolle).WithMany(p => p.Brukers)
                .HasForeignKey(d => d.RolleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_bruker_rolle1");
        });

        modelBuilder.Entity<Faktura>(entity =>
        {
            entity.HasKey(e => e.FakturaNr).HasName("PRIMARY");

            entity.ToTable("faktura");

            entity.HasIndex(e => e.BrukerBrukerNr, "fk_faktura_bruker1_idx");

            entity.Property(e => e.FakturaNr)
                .HasColumnType("int(11)")
                .HasColumnName("fakturaNr");
            entity.Property(e => e.AvtaleDato)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("avtaleDato");
            entity.Property(e => e.BetaltDato)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("betaltDato");
            entity.Property(e => e.BrukerBrukerNr)
                .HasColumnType("int(11)")
                .HasColumnName("bruker_brukerNr");
            entity.Property(e => e.SendtDato)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("sendtDato");
            entity.Property(e => e.Sum)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("sum");

            entity.HasOne(d => d.BrukerBrukerNrNavigation).WithMany(p => p.Fakturas)
                .HasForeignKey(d => d.BrukerBrukerNr)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_faktura_bruker1");
        });

        modelBuilder.Entity<Journal>(entity =>
        {
            entity.HasKey(e => e.JournalNr).HasName("PRIMARY");

            entity.ToTable("journal");

            entity.HasIndex(e => e.PasientNr, "fk_Journal_bruker1_idx");

            entity.Property(e => e.JournalNr)
                .HasColumnType("int(11)")
                .HasColumnName("journalNr");
            entity.Property(e => e.PasientNr)
                .HasColumnType("int(11)")
                .HasColumnName("pasientNr");

            entity.HasOne(d => d.PasientNrNavigation).WithMany(p => p.Journals)
                .HasForeignKey(d => d.PasientNr)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Journal_bruker1");
        });

        modelBuilder.Entity<Journalnotat>(entity =>
        {
            entity.HasKey(e => e.JournalnotatNr).HasName("PRIMARY");

            entity.ToTable("journalnotat");

            entity.HasIndex(e => e.JournalNr, "fk_journalnotat_Journal1_idx");

            entity.HasIndex(e => e.BehandlerNr, "fk_journalnotat_bruker1_idx");

            entity.Property(e => e.JournalnotatNr).HasColumnType("int(11)");
            entity.Property(e => e.BehandlerNr)
                .HasColumnType("int(11)")
                .HasColumnName("behandlerNr");
            entity.Property(e => e.Dato).HasColumnType("date");
            entity.Property(e => e.JournalNr)
                .HasColumnType("int(11)")
                .HasColumnName("journalNr");
            entity.Property(e => e.Journalnotat1)
                .HasMaxLength(3000)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("journalnotat");
            entity.Property(e => e.Overskrift)
                .HasMaxLength(150)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("overskrift");
            entity.Property(e => e.Tid).HasColumnType("time");

            entity.HasOne(d => d.BehandlerNrNavigation).WithMany(p => p.Journalnotats)
                .HasForeignKey(d => d.BehandlerNr)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_journalnotat_bruker1");

            entity.HasOne(d => d.JournalNrNavigation).WithMany(p => p.Journalnotats)
                .HasForeignKey(d => d.JournalNr)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_journalnotat_Journal1");
        });

        modelBuilder.Entity<Poststed>(entity =>
        {
            entity.HasKey(e => e.PostNr).HasName("PRIMARY");

            entity.ToTable("poststed");

            entity.Property(e => e.PostNr)
                .HasColumnType("int(11)")
                .HasColumnName("postNr");
            entity.Property(e => e.PostSted1)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("postSted");
        });

        modelBuilder.Entity<Rolle>(entity =>
        {
            entity.HasKey(e => e.RolleId).HasName("PRIMARY");

            entity.ToTable("rolle");

            entity.Property(e => e.RolleId)
                .HasColumnType("int(11)")
                .HasColumnName("rolleId");
            entity.Property(e => e.RolleNavn)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("rolleNavn");
        });

        modelBuilder.Entity<Rom>(entity =>
        {
            entity.HasKey(e => e.RomNr).HasName("PRIMARY");

            entity.ToTable("rom");

            entity.Property(e => e.RomNr)
                .HasColumnType("int(11)")
                .HasColumnName("romNr");
            entity.Property(e => e.RomNavn)
                .HasMaxLength(45)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("romNavn");
            entity.Property(e => e.SittePlasser)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("sittePlasser");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
