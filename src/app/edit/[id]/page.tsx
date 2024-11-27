import DeleteButton from "@/components/delete-button";
import EditFormSection from "@/sections/edit/edit-form.section";
import { getPostDetailService } from "@/services/get-detail-post.service";

type PProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: PProps) {
  const id = (await params).id;
  const data = (await getPostDetailService(id)).result;
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <DeleteButton id={id} />
      </div>
      <EditFormSection id={id} title={data.title} content={data.content} />
    </div>
  );
}
