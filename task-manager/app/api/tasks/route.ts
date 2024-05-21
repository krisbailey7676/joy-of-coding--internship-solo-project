import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client"

// defines the shape of the object and body of API request
const createTaskSchema = z.object({
    title: z.string().min(1).max(255),
    dueDateTime: z.string(),
    description: z.string().min(1),
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const newTask = await prisma.task.create({
        data: {title: body.title, dueDateTime: body.dueDateTime, description: body.description}
    })
    return NextResponse.json(newTask, {status: 201})

}