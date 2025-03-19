import type { NextApiRequest, NextApiResponse } from "next";
import { ToDoItem } from "../types/item";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type ErrorResponse = {
    error: string;
    details?: string;
}

export default async function toDoHandler (
    req: NextApiRequest,
    res: NextApiResponse<ToDoItem | ErrorResponse>,
) {
    if (req.method === "POST") {
        const { title, content, completionDate } = req.body;
        if (!title || !completionDate) {
            res.status(400).json({ error: "Title and Due Date are required" });
            return;
        }

        const list = await prisma.toDoList.findFirst({});
        if (!list) {
            res.status(404).json({ error: "No list found" });
            return;
        }

        try {
            const newItem = await prisma.toDoItem.create({
                data: {
                    title,
                    content,
                    completed: false,
                    completionDate: new Date(completionDate),
                    todoListId: list.id
                }, select: {
                    id: true,
                    title: true,
                    content: true,
                    completed: true,
                    completionDate: true,
                    createdAt: true
                }
            });
    
            res.status(201).json({ 
                id: newItem.id,
                title: newItem.title, 
                content: newItem.content ?? "", 
                completed: newItem.completed, 
                completionDate: newItem.completionDate, 
                createdAt: newItem.createdAt 
            });
        } catch (error) {
            res.status(400).json({ error: "Error creating item", details: (error as Error).message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
