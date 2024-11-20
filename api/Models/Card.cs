using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Card
{
    public int Id { get; set; }

    public string CardName { get; set; } = null!;

    public int AnimalClassId { get; set; }

    public int FamilyId { get; set; }

    public int SizeId { get; set; }

    public string? AirValue { get; set; }

    public int? LandValue { get; set; }

    public int? WaterValue { get; set; }

    public string? TextBox { get; set; }

    public string? ImgUrl { get; set; }

    public int? ArtistId { get; set; }

    public virtual AnimalClass AnimalClass { get; set; } = null!;

    public virtual Artist? Artist { get; set; }

    public virtual Family Family { get; set; } = null!;

    public virtual ICollection<GameCard> GameCards { get; set; } = new List<GameCard>();

    public virtual ICollection<GameOverride> GameOverrides { get; set; } = new List<GameOverride>();

    public virtual Size Size { get; set; } = null!;
}
