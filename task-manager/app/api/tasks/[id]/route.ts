import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { taskSchema } from "@/app/validationSchemas";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task)
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  return NextResponse.json(task, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = taskSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task)
    return NextResponse.json({ error: "Task not found." }, { status: 404 });

  const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: {
      title: body.title,
      status: body.status,
      description: body.description,
      dueDateTime: body.dueDateTime,
    },
  });

  return NextResponse.json(updatedTask, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task)
    return NextResponse.json({ error: "Task not found." }, { status: 404 });

  await prisma.task.delete({
    where: { id: task.id },
  });

  return NextResponse.json({}, { status: 200 });
}
