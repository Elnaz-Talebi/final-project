import { z } from "zod";

export const checkReviewInputsValidation = z.object({
  plantId: z
    .number({
      required_error: "plantId is required",
      invalid_type_error: "plantId must be a number",
    })
    .int()
    .positive(),

  userId: z
    .number({
      required_error: "userId is required",
      invalid_type_error: "userId must be a number",
    })
    .int()
    .positive(),

  rating: z
    .number({
      required_error: "rating is required",
      invalid_type_error: "rating must be a number",
    })
    .int()
    .refine((val) => [1, 2, 3, 4, 5].includes(val), {
      message: "rating must be between 1 and 5",
    }),

  comment: z
    .string()
    .max(500, "comment cannot exceed 500 characters")
    .optional(),
});
