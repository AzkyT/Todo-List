import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type ListResponse = {
    id: number;
    hasItems: boolean;
    exists: boolean;
}

type ErrorResponse = {
    error: string;
    details?: string;
}

export default async function getListHandler (
    req: NextApiRequest,
    res: NextApiResponse<ListResponse | ErrorResponse>,
) {
    if (req.method === "GET") {
        const list = await prisma.toDoList.findFirst({
            include: {
                items: true
            }
        });

        if (!list) {
            res.status(200).json({ error: "No list found" });
            return;
        }

        const hasItems = list.items.length > 0;

        res.status(200).json({ id: list.id, hasItems, exists: true });
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}