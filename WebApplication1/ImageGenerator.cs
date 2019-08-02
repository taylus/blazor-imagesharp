using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace WebApplication1
{
    public class ImageGenerator
    {
        private Base64ImageTranslator translator;

        public ImageGenerator(Base64ImageTranslator translator)
        {
            this.translator = translator;
        }

        public Image<Rgba32> Generate()
        {
            //TODO: generate cooler images
            var pixels = new[] { Rgba32.Red, Rgba32.Green, Rgba32.Blue, Rgba32.Yellow };
            return Image.LoadPixelData(pixels, 2, 2);
        }

        public string GenerateBase64()
        {
            var image = Generate();
            return translator.ToBase64String(image);
        }
    }
}