import { z } from "zod";

export const checkPageQueryValidation = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)) // page defaults to 1 if missing.
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),

  pageSize: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))  // pageSize defaults to 10
    .refine((val) => val > 0 && val <= 50, { message: "PageSize must be between 1 and 50" }),
});