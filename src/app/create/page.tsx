import CreateFormSection from "@/sections/create/create-form.section";

export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
      <CreateFormSection />
    </div>
  );
}
