"use client";

import { useEffect, useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import useTodoApi from "@/hooks/useTodoApi";

export default function Home() {
    const { todos, addTodo } = useTodoApi();

    const handleAddTodo = async (todo: string) => {
        addTodo(todo);
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>TODO</h1>
            <TodoForm onSubmit={handleAddTodo} />
            <TodoList items={todos} />
        </main>
    );
}
