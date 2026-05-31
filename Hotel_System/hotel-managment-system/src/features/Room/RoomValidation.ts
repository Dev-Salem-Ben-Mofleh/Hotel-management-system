import * as Yup from "yup";
import { RoomRepository } from "../../services/Repository/RoomRepository";

const roomRepository = new RoomRepository();

export const roomSchema = Yup.object({
  roomTypeId: Yup.number().required("Room Type ID is required"),

  roomNumber: Yup.string()
    .required("Room Number is required")
    .test(
      "unique-room-number",
      "Room number already exists",
      async function (value) {
        if (!value) return false;

        const { parent } = this;
        const roomId = parent.roomId || 0;

        try {
          const exists = await roomRepository.ExistsByRoomNumber(value, roomId);

          return !exists;
        } catch {
          return true;
        }
      },
    ),

  roomFloor: Yup.number().required("Room Floor is required"),

  availabilityStatus: Yup.string().required("Availability Status is required"),

  roomImageUrl: Yup.mixed<File | string>().required("Room Image is required"),

  isSmokingAllowed: Yup.boolean().required("Smoking Allowed is required"),

  isPetFriendly: Yup.boolean().required("Pet Friendly is required"),

  additionalNotes: Yup.string().nullable().default(null),
});

export type RoomFormValues = Yup.InferType<typeof roomSchema>;
