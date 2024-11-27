import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const data = await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalPosts = await prisma.post.count();

  return NextResponse.json({
    data,
    totalPosts,
    totalPages: Math.ceil(totalPosts / pageSize),
    currentPage: page,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newPost = await prisma.post.create({
    data: { title: body.title, content: body.content },
  });
  return NextResponse.json(newPost, { status: 201 });
}
