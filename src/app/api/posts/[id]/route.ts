import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updatedPost = await prisma.post.update({
    where: { id: Number(params.id) },
    data: { title: body.title, content: body.content },
  });
  return NextResponse.json(updatedPost);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.post.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Post deleted" }, { status: 204 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const posts = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(posts);
}
