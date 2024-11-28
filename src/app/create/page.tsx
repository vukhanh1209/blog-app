import { ROUTES } from "@/constant/route.constant";
import CreateFormSection from "@/sections/create/create-form.section";
import Link from "next/link";

export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <Link href={ROUTES.home} className="text-black text-base font-medium">
        ( Back )
      </Link>
      <h1 className="text-3xl font-bold my-4">Create New Post</h1>
      <CreateFormSection />
    </div>
  );
}
