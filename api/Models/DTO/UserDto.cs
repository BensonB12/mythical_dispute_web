namespace api.Models;

public class UserDto
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public bool Notifications { get; set; }

    public string? UserColor { get; set; }

    public List<GameDto> Games { get; set; } = [];
}