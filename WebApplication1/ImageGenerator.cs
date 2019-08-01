using System;
using System.IO;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

public class ImageGenerator
{
    public Image<Rgba32> Generate()
    {
        //TODO: generate cooler images
        var pixels = new[] { Rgba32.Red, Rgba32.Green, Rgba32.Blue, Rgba32.Yellow };
        return Image.LoadPixelData(pixels, 2, 2);
    }

    public string GenerateBase64()
    {
        var image = Generate();
        using (var stream = new MemoryStream())
        {
            image.SaveAsPng(stream);
            var bytes = stream.ToArray();
            return Convert.ToBase64String(bytes);
        }
    }
}