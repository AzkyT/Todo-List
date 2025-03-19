import { NextApiRequest, NextApiResponse } from "next";
import { ToDoItem } from "../types/item";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type ErrorResponse = {
    error: string;
    details?: string;
}

export default async function editItemHandler (
    req: NextApiRequest,
    res: NextApiResponse<ToDoItem | ErrorResponse>,
) {
    if (req.method === "POST") {
        const { id, completed } = req.body;

        try {
            const item = await prisma.toDoItem.update({
                where: { id: id },
                data: { completed: completed }
            });


            res.status(200).json({
                ...item,
                content: item.content ?? ""
            });
        } catch (error) {
            res.status(400).json({ error: "Error updating item", details: (error as Error).message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}