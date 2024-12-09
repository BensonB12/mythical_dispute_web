using Api.Utils;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;

namespace apiTests;

public class UtilTests
{
    [Fact]
    public void ConvertIFormFileToByteArray_ShouldReturnEmptyArray_WhenFileIsNull()
    {
        // Arrange / Act
        var result = Converter.ConvertIFormFileToByteArray(null!);

        result.Should().BeEmpty();
    }

    [Fact]
    public void ConvertIFormFileToByteArray_ShouldReturnEmptyArray_WhenFileIsEmpty()
    {
        // Arrange
        var mockFile = new Mock<IFormFile>();
        mockFile.Setup(f => f.Length).Returns(0);

        // Act
        var result = Converter.ConvertIFormFileToByteArray(mockFile.Object);

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public void ConvertIFormFileToByteArray_ShouldReturnByteArray_WhenFileHasContent()
    {
        // Arrange
        var currentDirectory = Directory.GetCurrentDirectory();

        while (currentDirectory.Split(Path.DirectorySeparatorChar).Last().ToLower() != "apitests")
        {
            currentDirectory = Directory.GetParent(currentDirectory)?.FullName;

            if (string.IsNullOrEmpty(currentDirectory))
            {
                break;
            }
        }

        var fileStream = new FileStream(currentDirectory + "/TestFile.txt", FileMode.Open, FileAccess.Read);

        var formFile = new FormFile(fileStream, 0, fileStream.Length, "file", Path.GetFileName("./TestFile.txt"))
        {
            Headers = new HeaderDictionary(),
            ContentType = "text/plain"
        };

        // Act
        var result = Converter.ConvertIFormFileToByteArray(formFile);

        // Assert
        result.Should().BeEquivalentTo("abc"u8.ToArray());
    }
}
