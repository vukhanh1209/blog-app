"use client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";
import { ROUTES } from "@/constant/route.constant";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      router.push(ROUTES.home);
      toast.success("Post deleted successfully");
    } catch {
      toast.error("Failed to delete post. Please try again.");
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="mt-4 bg-red-500 text-white">Delete Post</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button className="bg-gray-300">Cancel</Button>
            </DialogClose>

            <Button
              type="submit"
              onClick={handleDelete}
              className="bg-red-500 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
