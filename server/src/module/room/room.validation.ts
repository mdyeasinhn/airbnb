import { z } from "zod";

const imageSchema = z
  .string({ error: "Image is required." })
  .url("Invalid image URL.")
  .regex(/\.(jpg|jpeg|png|webp|gif)$/i, "Image must end with a valid extension");

const createValidationSchema = z.object({
  title: z
    .string({ error: "Title is required." })
    .min(3, "Title must be at least 3 characters long."),

  description: z
    .string({ error: "Description is required." })
    .min(10, "Description must be at least 10 characters long."),

  images: z
    .array(imageSchema, { error: "At least one image is required." })
    .min(1, "At least one image is required."),

  price: z
    .number({ error: "Price is required." })
    .min(0, "Price must be greater than or equal to 0."),

  duration: z
    .number({ error: "Duration is required." })
    .min(1, "Duration must be at least 1 minute."),

  discount: z
    .number()
    .min(0, "Discount cannot be negative.")
    .max(100, "Discount cannot exceed 100%.")
    .optional(),
});

const updateValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long.").optional(),

  description: z.string().min(10, "Description must be at least 10 characters long.").optional(),

  images: z
    .array(imageSchema)
    .min(1, "At least one image is required.")
    .optional(),

  price: z.number().min(0, "Price must be greater than or equal to 0.").optional(),

  duration: z.number().min(1, "Duration must be at least 1 minute.").optional(),

  discount: z
    .number()
    .min(0, "Discount cannot be negative.")
    .max(100, "Discount cannot exceed 100%.")
    .optional(),
});

export const roomValidation = {
  createValidationSchema,
  updateValidationSchema,
};
