"use client";
import { useState, useEffect } from "react";
import BgImage from "@/components/BgImage";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");

  // Initialize todos and theme from localStorage only on client
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

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
    <main
      className={`min-w-full min-h-screen pb-20 ${
        theme === "dark" ? "bg-navy-950" : "bg-gray-50"
      }`}
    >
      <BgImage theme={theme} toggleTheme={toggleTheme} />

      <div className="relative -mt-24 px-6 max-w-xl mx-auto z-30">
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
    </main>
  );
}
