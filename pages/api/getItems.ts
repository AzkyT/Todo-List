import { NextApiRequest, NextApiResponse } from "next";
import { ToDoItem } from "../types/item";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type ErrorResponse = {
    error: string;
    details?: string;
}

export default async function getItemsHandler (
    req: NextApiRequest,
    res: NextApiResponse<ToDoItem[] | ErrorResponse>,
) {
    if (req.method === "GET") {
        const items = await prisma.toDoItem.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                completed: true,
                completionDate: true,
                createdAt: true
            }
        });

        const formattedItems = items.map(item => ({
            ...item,
            content: item.content ?? ""
        }));

        res.status(200).json(formattedItems);
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}