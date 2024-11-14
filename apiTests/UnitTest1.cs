using FluentAssertions;

namespace apiTests;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {
        "pass".Should().Be("pass");
    }
}