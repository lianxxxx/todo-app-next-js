"use client";
import { useState, useEffect } from "react";
import BgImage from "@/components/BgImage";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <main className="min-w-full">
      <section className="relative">
        <BgImage theme={theme} toggleTheme={toggleTheme} />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full px-6 max-w-xl z-10">
          <TodoInput addTodo={addTodo} theme={theme} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            deleteTodo={deleteTodo}
            filter={filter}
            setFilter={setFilter}
            clearCompleted={clearCompleted}
            theme={theme}
          />
        </div>
      </section>
    </main>
  );
}
