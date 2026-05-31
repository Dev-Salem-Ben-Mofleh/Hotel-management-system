using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using HotelBussinse.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net;

namespace HotelBussinse.Services.Implements
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;
        private readonly ILogger<CloudinaryService> _logger;
        private const string FolderName = "Hotel Images";

        public CloudinaryService(IOptions<CloudinarySettings> cloudinarySettings, ILogger<CloudinaryService> logger)
        {
            var settings = cloudinarySettings.Value;
            var account = new Account(settings.CloudName, settings.ApiKey, settings.ApiSecret);
            _cloudinary = new Cloudinary(account);
            _cloudinary.Api.Secure = true;
            _logger = logger;
        }


        private string _GetPublicIdFromUrl(string url)
        {
            string decodedUrl = Uri.UnescapeDataString(url);
            Uri uri = new Uri(decodedUrl);
            string fileName = uri.Segments[^1];
            return FolderName + "/" + fileName[..fileName.LastIndexOf('.')];
        }
        public async Task<string> UploadImage(Stream imageStream, string fileName)
        {
            string imageUrl = "";
            try
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(fileName, imageStream),
                    Folder = FolderName
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.StatusCode == HttpStatusCode.OK)
                {
                    imageUrl = uploadResult.SecureUri.ToString();
                }

                return imageUrl;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "UploadImage failed");
                return "Upload failed.";

            }

        }
        public async Task<string> UpdateImage(Stream imageStream, string oldImage, string NewImage)
        {
            string imageUrl = "";

            string oldPublicId = _GetPublicIdFromUrl(oldImage);
            try
            {

                var deleteResult = await _cloudinary.DeleteResourcesAsync(CloudinaryDotNet.Actions.ResourceType.Image, oldPublicId);
                if (deleteResult.StatusCode == HttpStatusCode.OK)
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(NewImage, imageStream),
                        Folder = FolderName
                    };

                    var uplloadResult = await _cloudinary.UploadAsync(uploadParams);

                    if (uplloadResult.StatusCode.ToString().ToUpper() == "OK")
                    {
                        imageUrl = uplloadResult.SecureUri.ToString();

                    }

                }

                return imageUrl;


            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "UpdateImage failed");
                return "Old image could not be deleted.";
            }


        }
        public async Task<bool> DeleteImage(string imageLink)
        {
            try
            {
                var publicId = _GetPublicIdFromUrl(imageLink);
                var result = await _cloudinary.DeleteResourcesAsync(ResourceType.Image, publicId);

                return result.StatusCode == HttpStatusCode.OK
                    ? true
                    : false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "DeleteImage failed");
                return false;
            }
        }

    }
}
