import type { UploadedImageUrl } from "./models/Image";
import fetchData from "./Repository/FetchAPI";

const url = `https://hotelbooking.runasp.net/api/Hotel/images`;

export class ImageServices {
  public async uploadImage(imageFile: File): Promise<UploadedImageUrl> {
    const formData = new FormData();
    formData.append("ImageFile", imageFile);

    const roomImageUrl: UploadedImageUrl = await fetchData<UploadedImageUrl>(
      `${url}/UploadImage`,
      {
        method: "POST",
        body: formData,
      },
      false,
    );

    return roomImageUrl;
  }

  public async updateImage(
    oldImageUrl: string,
    imageFile: File,
  ): Promise<UploadedImageUrl> {
    const formData = new FormData();

    formData.append("file", imageFile);

    const roomImageUrl = await fetchData<UploadedImageUrl>(
      `${url}/UpdateImage?oldImageUrl=${encodeURIComponent(oldImageUrl)}`,
      {
        method: "PUT",
        body: formData,
      },
      false,
    );

    return roomImageUrl;
  }

  public async deleteImage(imageFile: string): Promise<UploadedImageUrl> {
    return await fetchData<UploadedImageUrl>(
      `${url}/DeleteImage?imageFile=${encodeURIComponent(imageFile)}`,
      {},
      false,
    );
  }
}
