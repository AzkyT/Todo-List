import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type ErrorResponse = {
    error: string;
    details?: string;
}

export default async function deleteItemHandler (
    req: NextApiRequest,
    res: NextApiResponse<{ success: boolean } | ErrorResponse>,
) {
    if (req.method === "DELETE") {
        const { id } = req.body;

        try {
            await prisma.toDoItem.delete({
                where: { id: id }
            });

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(400).json({ error: "Error deleting item", details: (error as Error).message });
        }
    } else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}