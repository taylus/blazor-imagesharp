using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace WebApplication1
{
    public class ImageGrayscaler
    {
        private Base64ImageTranslator translator;

        public ImageGrayscaler(Base64ImageTranslator translator)
        {
            this.translator = translator;
        }

        public void Grayscale(Image<Rgba32> image)
        {
            image.Mutate(i => i.Grayscale());
        }

        public string Grayscale(string base64ImageData)
        {
            using (var image = translator.FromBase64String(base64ImageData))
            {
                Grayscale(image);
                return translator.ToBase64String(image);
            }
        }
    }
}