import * as Yup from "yup";

export const roomTypeSchema = Yup.object({
  roomTypeTitle: Yup.string().required("Room Type Title is required"),
  roomTypeDescription: Yup.string().required(
    "Room Type Description is required"
  ),
  roomTypeCapacity: Yup.number().required("Room Type Capacity is required"),
  roomTypePricePerNight: Yup.number().required(
    "roomType Price Per Night is required"
  ),
});

export type RoomTypeFormValues = Yup.InferType<typeof roomTypeSchema>;
