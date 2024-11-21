using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Family
{
    public int Id { get; set; }

    public string FamilyName { get; set; } = null!;

    public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
}
