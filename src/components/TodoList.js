"use client";
import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete online JavaScript course", completed: true },
    { id: 2, text: "Jog around the park 3x", completed: false },
    { id: 3, text: "10 minutes meditation", completed: false },
    { id: 4, text: "Read for 1 hour", completed: false },
    { id: 5, text: "Pick up groceries", completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="bg-white rounded-lg w-full shadow-xl/30 mt-4">
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center p-3 border-b border-gray-200 last:border-b-0"
          >
            {/* Circle/Checkbox */}
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 border-2 rounded-full mr-4 shrink-0 transition-colors ${
                todo.completed
                  ? "bg-gradient-to-br from-blue-400 to-purple-500 border-transparent"
                  : "border-gray-300 hover:border-purple-400"
              }`}
            />

            {/* Todo text */}
            <span
              className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}
            >
              {todo.text}
            </span>

            {/* Delete icon */}
            <button className="text-gray-400 hover:text-gray-600">×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
