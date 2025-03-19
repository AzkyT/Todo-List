import React from 'react';
import AddItem from './addItem';
import Item from './item';
import { ToDoItem } from '../types/item';

type ListProps = {
    items: ToDoItem[];
    setItems: React.Dispatch<React.SetStateAction<ToDoItem[]>>;
};

export default function ToDoList({ items, setItems }: ListProps) {
    return (
        <div className="container flex flex-col lg:flex-row">
            <div id="left" className="w-full lg:w-1/5 lg:mr-7">
                <AddItem items={items} setItem={setItems}/>
            </div>
            
            <div id="right" className="w-full lg:w-4/5">
                <div className="mt-5 lg:mt-0">
                    <h1 className="text-2xl font-semibold text-gray-800 drop-shadow-md">To Do List</h1> 
                    
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {items
                        .filter(item => !item.completed)
                        .sort((a, b) => new Date(a.completionDate).getTime() - new Date(b.completionDate).getTime())
                        .map((item, index) => (
                            <Item key={index} 
                                id={item.id}
                                title={item.title} 
                                content={item.content} 
                                completed={item.completed} 
                                completionDate={item.completionDate} 
                                createdAt={item.createdAt} 
                                items={items}
                                setItem={setItems}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="mt-5 text-2xl font-semibold text-gray-800 drop-shadow-md">Completed</h1>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {items
                            .filter(item => item.completed)
                            .sort((a, b) => new Date(a.completionDate).getTime() - new Date(b.completionDate).getTime())
                            .map((item, index) => (
                                <Item key={index} 
                                    id={item.id}
                                    title={item.title} 
                                    content={item.content} 
                                    completed={item.completed} 
                                    completionDate={item.completionDate} 
                                    createdAt={item.createdAt} 
                                    items={items}
                                    setItem={setItems}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}