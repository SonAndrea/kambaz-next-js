"use client";
import { Button } from "react-bootstrap";
import { useTodos } from "./context";

export default function ReactContextTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos();

  return (
    <div id="wd-react-context-todo-list">
      <h2>Todo List</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <div className="d-flex gap-2">
            <input
              className="form-control"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <Button
              className="btn btn-warning"
              onClick={() => updateTodo(todo)}
            >
              Update
            </Button>
            <Button
              className="btn btn-success"
              onClick={() => addTodo(todo.title)}
            >
              Add
            </Button>
          </div>
        </li>

        {todos.map((t) => (
          <li
            key={t.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{t.title}</span>
            <div>
              <Button
                className="btn btn-primary me-2"
                onClick={() => setTodo(t)}
              >
                Edit
              </Button>
              <Button
                className="btn btn-danger"
                onClick={() => deleteTodo(t.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
