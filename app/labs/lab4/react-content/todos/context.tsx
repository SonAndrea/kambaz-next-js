"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Todo {
  id: string;
  title: string;
}

interface TodosContextState {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
}

const TodosContext = createContext<TodosContextState | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);

  // Default empty todo for the input field
  const [todo, setTodo] = useState<Todo>({ id: "", title: "" });

  const addTodo = (title: string) => {
    const newTodo = { id: new Date().getTime().toString(), title };
    setTodos([newTodo, ...todos]);
    setTodo({ id: "", title: "" }); // Reset input
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
    setTodo({ id: "", title: "" }); // Reset input
  };

  return (
    <TodosContext.Provider
      value={{ todos, todo, setTodo, addTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodos must be used within a TodosProvider");
  return context;
};
