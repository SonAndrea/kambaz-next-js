import { create } from "zustand";

interface Todo {
  id: string;
  title: string;
}

interface TodoState {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "", title: "" },
  
  setTodo: (todo) => set({ todo }),

  addTodo: (title) => 
    set((state) => ({
      todos: [{ id: Date.now().toString(), title }, ...state.todos],
      todo: { id: "", title: "" },
    })),

  deleteTodo: (id) => 
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),

  updateTodo: (updatedTodo) => 
    set((state) => ({
      todos: state.todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
      todo: { id: "", title: "" }, 
    })),
}));

export default useTodoStore;