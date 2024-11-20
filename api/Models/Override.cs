using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Override
{
    public int Id { get; set; }

    public string OverrideValue { get; set; } = null!;

    public virtual ICollection<GameOverride> GameOverrides { get; set; } = new List<GameOverride>();
}
