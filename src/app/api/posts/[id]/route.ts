import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await req.json();
  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: { title: body.title, content: body.content },
  });
  return NextResponse.json(updatedPost);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  await prisma.post.delete({ where: { id: Number(id) } });
  return NextResponse.json({}, { status: 200 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const posts = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(posts);
}
