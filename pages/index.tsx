import { useState, useEffect } from "react";
import ToDoList from "./components/toDoList";
import { ToDoItem } from "./types/item";

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();


export default function Home() {
    const [listExists, setListExists] = useState(false);
    const [showList, setShowList] = useState(false);
    const [items, setItems] = useState<ToDoItem[]>([]);

    // grab the list of items already in the database
    const itemsFromDB = async () => {
        const responseList = await fetch("/api/getList");
        const list = await responseList.json();
        if (list.exists) {
            setListExists(true);

            if (list.hasItems) {
                const response = await fetch("/api/getItems");
                const items = await response.json();
                setItems(items);
            }
        }
    }

    useEffect(() => {
        itemsFromDB();
    }, []);

    const handleGetStartedClick = async () => {
        const response = await fetch("/api/createList", {
            method: "POST"
        });
        
        if (response.status === 201) {
            setShowList(true);
        }
    };

    return (
        <div className="m-10">
            {!listExists && !showList ? (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className={`text-5xl mb-5 font-bold drop-shadow-md`}>TickIt</h1>
                    <button onClick={handleGetStartedClick} 
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded shadow-lg"
                    >Get Started</button>
                </div>
            ) : (
                <div className="flex flex-col items-center mt-20">
                    <h1 className="text-4xl mb-4 font-bold drop-shadow-md">TickIt</h1>
                    <ToDoList items={items} setItems={setItems} />
                </div>
            )}
        </div>
    );
}