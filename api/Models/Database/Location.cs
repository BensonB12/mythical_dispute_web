using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Location
{
    public int Id { get; set; }

    public string LocationName { get; set; } = null!;
}
