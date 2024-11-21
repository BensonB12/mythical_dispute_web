using System;
using System.Collections.Generic;

namespace api.Models;

public partial class CardDTO
{
  public int Id { get; set; }

  public string CardName { get; set; } = null!;

  public string AnimalClass { get; set; } = null!;

  public string Family { get; set; } = null!;

  public string Size { get; set; } = null!;

  public string? AirValue { get; set; }

  public int? LandValue { get; set; }

  public int? WaterValue { get; set; }

  public string? TextBox { get; set; }

  public string? ImgUrl { get; set; }

  public string? ArtistName { get; set; }
}
