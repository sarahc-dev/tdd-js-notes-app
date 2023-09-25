import { useEffect, useState } from "react";
import { ITodo } from "@/types";

const useTodoApi = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const apiUrl = "http://localhost:8080/api/todos";

    const fetchTodos = async () => {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Network response error");
            }

            const data = await response.json();
            setTodos(data);
            setIsLoading(false);
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.error("Error fetching todos:", message);
        }
    };

    const addTodo = async (todo: string) => {
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: todo }),
            });

            if (!response.ok) {
                throw new Error("Network response error");
            }

            const newTodo = await response.json();
            setTodos(prev => [...prev, newTodo]);
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.error("Error adding todo:", message);
        }
    };

    const editTodo = async (id: string, value: { [key: string]: string | boolean }) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });

            if (!response.ok) {
                throw new Error("Network response error");
            }

            const data = await response.json();

            setTodos(prevTodos => {
                return prevTodos.map(todo => {
                    if (todo._id === data._id) {
                        return { ...todo, ...data };
                    }
                    return todo;
                });
            });
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.error("Error editing todo:", message);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response error");
            }

            const data = await response.json();
            return data;
            // setTodos(prevTodos => {
            //     return prevTodos.filter(todo => todo._id !== data._id);
            // });
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.error("Error deleting todo:", message);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return {
        todos,
        isLoading,
        addTodo,
        editTodo,
        deleteTodo,
    };
};

export default useTodoApi;
