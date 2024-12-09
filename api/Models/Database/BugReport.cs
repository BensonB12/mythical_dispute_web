namespace api.Models;

public partial class BugReport
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string Report { get; set; } = null!;

    public byte[]? AttachedFile { get; set; }

    public DateTime? UploadedAt { get; set; }

    public virtual MdUser? User { get; set; }
}
