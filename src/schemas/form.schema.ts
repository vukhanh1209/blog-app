import { z } from "zod";

export const FormSchema = z.object({
  title: z.string().min(1, "This field is required"),
  content: z.string().min(1, "This field is required"),
});
