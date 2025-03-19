import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type Response = {
    message: string;
}

type ErrorResponse = {
    error: string;
    details?: string;
}

export default async function listHandler (
    req: NextApiRequest,
    res: NextApiResponse<Response | ErrorResponse>,
) {
    if (req.method === "POST") {
        try {
            await prisma.toDoList.create({});
            res.status(201).json({ message: "List created" });
        } catch (error) {
            res.status(400).json({ error: "Error creating list", details: (error as Error).message });
        }
    }
}
