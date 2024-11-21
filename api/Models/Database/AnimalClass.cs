using System;
using System.Collections.Generic;

namespace api.Models;

public partial class AnimalClass
{
    public int Id { get; set; }

    public string ClassName { get; set; } = null!;

    public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
}
