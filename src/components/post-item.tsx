import Link from "next/link";
import { ROUTES } from "@/constant/route.constant";

type Props = {
  id: number;
  title: string;
  content: string;
};

export default function PostItem({ id, content, title }: Props) {
  return (
    <Link
      href={`${ROUTES.edit}/${id}`}
      className="block p-4 border rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-500"
    >
      <h2 className="text-2xl font-semibold mb-4 line-clamp-1">{title}</h2>
      <p
        className="text-gray-700 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: content }}
      ></p>
    </Link>
  );
}
