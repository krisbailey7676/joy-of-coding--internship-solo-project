import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createTaskSchema } from "../../validationSchemas";

export async function GET(request: NextRequest) {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createTaskSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newTask = await prisma.task.create({
    data: {
      title: body.title,
      dueDateTime: body.dueDateTime,
      description: body.description,
    },
  });
  return NextResponse.json(newTask, { status: 201 });
}