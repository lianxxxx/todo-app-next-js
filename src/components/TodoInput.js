"use client";
import { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue("");
    }
  };
  return (
    <div className="flex items-center bg-white rounded-lg p-4 border-0 w-full">
      {/* Fake radio/circle */}
      <div className="w-5 h-5 border border-gray-300 rounded-full mr-4 shrink-0"></div>

      {/* Input */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create a new todo..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className="outline-none flex-1 placeholder:text-gray-600"
        />
      </form>
    </div>
  );
}
