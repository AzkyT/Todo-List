import React, { useState } from "react";
import { ToDoItem } from "../types/item";

type AddProps = {
	items: ToDoItem[];
    setItem: React.Dispatch<React.SetStateAction<ToDoItem[]>>;
};

const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${year}/${month}/${day}`;
};

export default function AddItem({ items, setItem }: AddProps) {
	const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [formattedDate, setFormattedDate] = useState("");

	const handleCreateItem = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const response = await fetch("/api/createItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                title: title, 
                content: content, 
                completionDate: formattedDate 
            }),
        });
    
        const newItem = await response.json();

		setItem([...items, newItem]);
    };

	return (
		<div className="">
            <h1 className="text-2xl font-semibold text-gray-800 drop-shadow-md items-center">Add Task</h1>

            <form id="createItem" onSubmit={handleCreateItem} className="flex flex-col p-4" autoComplete="off">
                <div className="flex flex-col">
                    <label className="text-gray-500">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                        required
                        className="p-2 border-b-2 border-gray-200 bg-gray-50 outline-none"
                        placeholder="Enter a title..."
                    />
                </div>

                <div className="mt-3 flex flex-col">
                    <label className="text-gray-500">Content</label>
                    <input 
                        type="text"
                        name="content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="p-2 border-b-2 border-gray-200 bg-gray-50 outline-none"
                        placeholder="Enter content..."
                    />
                </div>

                <div className="mt-3 flex flex-col">
                    <label className="text-gray-500">Due Date</label>
                    <input 
                        type="date" 
                        name="completionDate" 
                        value={completionDate}
                        onChange={e => { setCompletionDate(e.target.value); 
                            setFormattedDate(formatDate(e.target.value)); 
                        }}
                        required
                        className="p-2 border-b-2 border-gray-200 bg-gray-50 outline-none"
                    />
                </div>
                
                <div>
                    <button type="submit" className="mt-5 w-full py-2 px-4 bg-teal-700 text-white rounded-md hover:bg-teal-800">
                        Add
                    </button>
                </div>
            </form>
		</div>
	);
}
