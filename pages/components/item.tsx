import React, { useState } from "react";
import { ToDoItem } from "../types/item";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type ItemProps = {
    id: number;
    title: string;
    content: string;
    completed: boolean;
    completionDate: Date;
    createdAt: Date;
    items: ToDoItem[];
    setItem: React.Dispatch<React.SetStateAction<ToDoItem[]>>;
};

export default function Item({ id, title, content, completed, completionDate, createdAt, items, setItem }: ItemProps) {
    const handleLeftClick = async () => {
        const response = await fetch("/api/editItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                completed: !completed
            })
        });

        const editedItem = await response.json();

        if (response.ok) {
            setItem(items.map(item => item.id === id ? editedItem : item));
        }
    };

    const handleRightClick = async (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent the default context menu

        const response = await fetch("/api/deleteItem", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        });

        if (response.ok) {
            setItem(items.filter(item => item.id !== id));
        }
    };

	return (
		<div className="group w-56 h-32 bg-gray-50 rounded shadow-lg text-center break-words hover:bg-gray-200 cursor-pointer select-none"
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
            tabIndex={0}
        >
            <h1 className="mt-2 text-lg font-semibold text-gray-800">{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
            <p className="mt-1 text-gray-600">{content.charAt(0).toUpperCase() + content.slice(1)}</p>
            <p className="mt-1 text-xs text-blue-800">{new Date(completionDate).toDateString()}</p>
            {completed ? 
                <p className="mt-1 text-xs text-green-700">Completed</p> : 
                <p className="mt-1 text-xs text-red-700">Not Completed</p>
                }
		</div>
	);
}
