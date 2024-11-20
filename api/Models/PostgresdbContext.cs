using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public partial class PostgresdbContext : DbContext
{
    public PostgresdbContext()
    {
    }

    public PostgresdbContext(DbContextOptions<PostgresdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AnimalClass> AnimalClasses { get; set; }

    public virtual DbSet<Artist> Artists { get; set; }

    public virtual DbSet<Card> Cards { get; set; }

    public virtual DbSet<CardZone> CardZones { get; set; }

    public virtual DbSet<Family> Families { get; set; }

    public virtual DbSet<Game> Games { get; set; }

    public virtual DbSet<GameCard> GameCards { get; set; }

    public virtual DbSet<GameOverride> GameOverrides { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<MdUser> MdUsers { get; set; }

    public virtual DbSet<Override> Overrides { get; set; }

    public virtual DbSet<Size> Sizes { get; set; }

    public virtual DbSet<UserColor> UserColors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=postgresdb;Username=bensonpostgres;password=passwordpostgres;port=2345;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AnimalClass>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("animal_class_pkey");

            entity.ToTable("animal_class");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ClassName)
                .HasMaxLength(50)
                .HasColumnName("class_name");
        });

        modelBuilder.Entity<Artist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("artist_pkey");

            entity.ToTable("artist");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ArtistName).HasColumnName("artist_name");
        });

        modelBuilder.Entity<Card>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("card_pkey");

            entity.ToTable("card");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AirValue).HasColumnName("air_value");
            entity.Property(e => e.AnimalClassId).HasColumnName("animal_class_id");
            entity.Property(e => e.ArtistId).HasColumnName("artist_id");
            entity.Property(e => e.CardName)
                .HasMaxLength(50)
                .HasColumnName("card_name");
            entity.Property(e => e.FamilyId).HasColumnName("family_id");
            entity.Property(e => e.ImgUrl).HasColumnName("img_url");
            entity.Property(e => e.LandValue).HasColumnName("land_value");
            entity.Property(e => e.SizeId).HasColumnName("size_id");
            entity.Property(e => e.TextBox).HasColumnName("text_box");
            entity.Property(e => e.WaterValue).HasColumnName("water_value");

            entity.HasOne(d => d.AnimalClass).WithMany(p => p.Cards)
                .HasForeignKey(d => d.AnimalClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("card_animal_class_id_fkey");

            entity.HasOne(d => d.Artist).WithMany(p => p.Cards)
                .HasForeignKey(d => d.ArtistId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("card_artist_id_fkey");

            entity.HasOne(d => d.Family).WithMany(p => p.Cards)
                .HasForeignKey(d => d.FamilyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("card_family_id_fkey");

            entity.HasOne(d => d.Size).WithMany(p => p.Cards)
                .HasForeignKey(d => d.SizeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("card_size_id_fkey");
        });

        modelBuilder.Entity<CardZone>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("card_zone_pkey");

            entity.ToTable("card_zone");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CardZoneValue).HasColumnName("card_zone_value");
            entity.Property(e => e.PlayerIdsHand).HasColumnName("player_ids_hand");

            entity.HasOne(d => d.PlayerIdsHandNavigation).WithMany(p => p.CardZones)
                .HasForeignKey(d => d.PlayerIdsHand)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("card_zone_player_ids_hand_fkey");
        });

        modelBuilder.Entity<Family>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("family_pkey");

            entity.ToTable("family");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FamilyName)
                .HasMaxLength(50)
                .HasColumnName("family_name");
        });

        modelBuilder.Entity<Game>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("game_pkey");

            entity.ToTable("game");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IsOver)
                .HasDefaultValue(false)
                .HasColumnName("is_over");
            entity.Property(e => e.JoinCode)
                .HasMaxLength(5)
                .HasColumnName("join_code");
            entity.Property(e => e.OtherPlayerId).HasColumnName("other_player_id");
            entity.Property(e => e.PlayersTurnId).HasColumnName("players_turn_id");
            entity.Property(e => e.WinnerId).HasColumnName("winner_id");

            entity.HasOne(d => d.OtherPlayer).WithMany(p => p.GameOtherPlayers)
                .HasForeignKey(d => d.OtherPlayerId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("game_other_player_id_fkey");

            entity.HasOne(d => d.PlayersTurn).WithMany(p => p.GamePlayersTurns)
                .HasForeignKey(d => d.PlayersTurnId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("game_players_turn_id_fkey");

            entity.HasOne(d => d.Winner).WithMany(p => p.GameWinners)
                .HasForeignKey(d => d.WinnerId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("game_winner_id_fkey");
        });

        modelBuilder.Entity<GameCard>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("game_card_pkey");

            entity.ToTable("game_card");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CardId).HasColumnName("card_id");
            entity.Property(e => e.CardZoneId).HasColumnName("card_zone_id");
            entity.Property(e => e.GameId).HasColumnName("game_id");

            entity.HasOne(d => d.Card).WithMany(p => p.GameCards)
                .HasForeignKey(d => d.CardId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("game_card_card_id_fkey");

            entity.HasOne(d => d.CardZone).WithMany(p => p.GameCards)
                .HasForeignKey(d => d.CardZoneId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("game_card_card_zone_id_fkey");

            entity.HasOne(d => d.Game).WithMany(p => p.GameCards)
                .HasForeignKey(d => d.GameId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("game_card_game_id_fkey");
        });

        modelBuilder.Entity<GameOverride>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("game_overrides_pkey");

            entity.ToTable("game_overrides");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ActualValue).HasColumnName("actual_value");
            entity.Property(e => e.CardId).HasColumnName("card_id");
            entity.Property(e => e.GameId).HasColumnName("game_id");
            entity.Property(e => e.OverrideId).HasColumnName("override_id");

            entity.HasOne(d => d.Card).WithMany(p => p.GameOverrides)
                .HasForeignKey(d => d.CardId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("game_overrides_card_id_fkey");

            entity.HasOne(d => d.Game).WithMany(p => p.GameOverrides)
                .HasForeignKey(d => d.GameId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("game_overrides_game_id_fkey");

            entity.HasOne(d => d.Override).WithMany(p => p.GameOverrides)
                .HasForeignKey(d => d.OverrideId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("game_overrides_override_id_fkey");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("location_pkey");

            entity.ToTable("location");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.LocationName).HasColumnName("location_name");
        });

        modelBuilder.Entity<MdUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("md_user_pkey");

            entity.ToTable("md_user");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.Notifications)
                .HasDefaultValue(false)
                .HasColumnName("notifications");
            entity.Property(e => e.UserColorId)
                .HasDefaultValue(1)
                .HasColumnName("user_color_id");
            entity.Property(e => e.Username).HasColumnName("username");

            entity.HasOne(d => d.UserColor).WithMany(p => p.MdUsers)
                .HasForeignKey(d => d.UserColorId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("md_user_user_color_id_fkey");
        });

        modelBuilder.Entity<Override>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("override_pkey");

            entity.ToTable("override");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.OverrideValue).HasColumnName("override_value");
        });

        modelBuilder.Entity<Size>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("size_pkey");

            entity.ToTable("size");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.SizeDisplay)
                .HasMaxLength(50)
                .HasColumnName("size_display");
        });

        modelBuilder.Entity<UserColor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("user_color_pkey");

            entity.ToTable("user_color");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.HexValue)
                .HasMaxLength(7)
                .HasColumnName("hex_value");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
