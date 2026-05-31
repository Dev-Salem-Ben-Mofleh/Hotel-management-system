
namespace HotelBussinse.Services.Interfaces
{
    public interface ICloudinaryService
    {
        Task<string> UploadImage(Stream stream, string fileName);
        Task<string> UpdateImage(Stream stream, string oldImage, string newFileName);
        Task<bool> DeleteImage(string imageUrl);

    }

}
