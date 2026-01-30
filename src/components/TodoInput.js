"use client";
import { useState } from "react";

export default function TodoInput({ addTodo, theme }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center rounded-lg p-3 border-0 w-full ${
        theme === "dark" ? "bg-navy-900" : "bg-white"
      }`}
    >
      <div
        className={`w-5 h-5 border rounded-full mr-4 shrink-0 ${
          theme === "dark" ? "border-purple-300" : "border-gray-300"
        }`}
      ></div>
      <input
        type="text"
        placeholder="Create a new todo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`outline-none flex-1 ${
          theme === "dark"
            ? "bg-navy-900 text-gray-300 placeholder:text-purple-600"
            : "bg-white text-navy-850 placeholder:text-gray-600"
        }`}
      />
    </form>
  );
}
