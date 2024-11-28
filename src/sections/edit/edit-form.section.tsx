"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constant/route.constant";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSchema } from "@/schemas/form.schema";
import { updatePostService } from "@/services/update-post.service";
import TextEditor from "@/components/text-editor";

type Props = {
  id: string;
  title: string;
  content: string;
};

export default function EditFormSection({ id, title, content }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title, content },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const res = await updatePostService({
      id: id,
      title: values.title,
      content: values.content,
    });
    if (res.status) {
      router.push(ROUTES.home);
      toast.success("Post updated successfully");
      return;
    }
    toast.error("Failed to update post. Please try again.");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 py-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title here" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>

              <FormControl>
                <TextEditor
                  defaultValue={field.value}
                  onChange={field.onChange}
                  error={form.formState.errors.content?.message}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
