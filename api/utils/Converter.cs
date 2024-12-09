namespace Api.Utils;

public static class Converter
{
    public static byte[] ConvertIFormFileToByteArray(IFormFile formFile)
    {
        if (formFile == null || formFile.Length == 0)
            return Array.Empty<byte>();

        using (var memoryStream = new MemoryStream())
        {
            formFile.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }
    }
}