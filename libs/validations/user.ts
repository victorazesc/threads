import * as z from "zod";

export const UserValidation = z.object({
  image: z.union([z.string().length(0), z.string().min(4)])
    .optional()
    .transform(e => e === "" ? undefined : e),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
});