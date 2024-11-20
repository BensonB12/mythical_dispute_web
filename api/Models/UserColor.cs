using System;
using System.Collections.Generic;

namespace api.Models;

public partial class UserColor
{
    public int Id { get; set; }

    public string HexValue { get; set; } = null!;

    public virtual ICollection<MdUser> MdUsers { get; set; } = new List<MdUser>();
}
