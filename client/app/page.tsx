"use client";

import { useEffect, useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { ITodo } from "@/types";

export default function Home() {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/todos");
                const todos = await response.json();
                setTodos(todos);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const addTodo = async (todo: string) => {
        try {
            const response = await fetch("http://localhost:8080/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: todo }),
            });
            const newTodo = await response.json();
            setTodos(prev => [...prev, newTodo]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>TODO</h1>
            <TodoForm onSubmit={addTodo} />
            <TodoList items={todos} />
        </main>
    );
}
