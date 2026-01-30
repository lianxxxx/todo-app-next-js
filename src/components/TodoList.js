"use client";
import Img from "next/image";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable Item Component
function SortableItem({ todo, toggleTodo, deleteTodo, theme }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center py-3 px-6 border-b last:border-b-0 text-sm  cursor-pointer ${
        theme === "dark" ? "border-purple-800" : "border-gray-300"
      }`}
    >
      {/* Circle */}
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`relative w-5 h-5 border rounded-full mr-4 shrink-0 transition-colors cursor-pointer flex items-center justify-center
          ${todo.completed ? "check-gradient" : "border-gray-300 hover:border-purple-400"}`}
      >
        {todo.completed && (
          <Img
            src="/icon-check.svg"
            alt="Check"
            width={10}
            height={10}
            className="relative z-10 "
          />
        )}
      </button>

      {/* Todo text - THIS is the drag handle */}
      <span
        {...attributes}
        {...listeners}
        className={`flex-1 transition-all duration-300 cursor-grab active:cursor-grabbing ${
          todo.completed
            ? `line-through font-light ${theme === "dark" ? "text-purple-600" : "text-purple-300"}`
            : theme === "dark"
              ? "text-gray-300"
              : "text-navy-850"
        }`}
      >
        {todo.text}
      </span>

      {/* Delete button - clickable only */}
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-gray-400 hover:text-red-500 cursor-pointer p-2 ml-2"
      >
        <Img src="/icon-cross.svg" alt="Delete" width={12} height={12} />
      </button>
    </li>
  );
}
// Main TodoList Component
export default function TodoList({
  todos,
  setTodos,
  deleteTodo,
  filter,
  setFilter,
  clearCompleted,
  theme,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250, // 250ms = 0.25 seconds
        tolerance: 5, // Allow 5px movement before canceling
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const getFilteredTodos = () => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  };

  const filteredTodos = getFilteredTodos();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <div
        className={`rounded-lg w-full shadow-lg mt-4 overflow-hidden  ${
          theme === "dark" ? "bg-navy-900" : "bg-white"
        }`}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredTodos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              {filteredTodos.map((todo) => (
                <SortableItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  theme={theme}
                />
              ))}

              {/* Footer */}
              <li
                className={`flex justify-between items-center p-4 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <span>
                  {todos.filter((todo) => !todo.completed).length} items left
                </span>

                {/* Desktop filters */}
                <div className="hidden md:flex gap-4 font-semibold">
                  <button
                    onClick={() => setFilter("all")}
                    className={`cursor-pointer ${filter === "all" ? "text-blue-500" : ""}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("active")}
                    className={`cursor-pointer ${filter === "active" ? "text-blue-500" : ""}`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter("completed")}
                    className={`cursor-pointer ${filter === "completed" ? "text-blue-500" : ""}`}
                  >
                    Completed
                  </button>
                </div>

                <button onClick={clearCompleted} className="cursor-pointer">
                  Clear Completed
                </button>
              </li>
            </ul>
          </SortableContext>
        </DndContext>
      </div>

      {/* Mobile filters */}
      <div
        className={`md:hidden mt-4 p-4 rounded-lg shadow-lg ${
          theme === "dark" ? "bg-navy-900" : "bg-white"
        }`}
      >
        <div className="flex justify-center gap-4 text-sm font-semibold text-gray-400">
          <button
            onClick={() => setFilter("all")}
            className={`cursor-pointer ${filter === "all" ? "text-blue-500" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`cursor-pointer ${filter === "active" ? "text-blue-500" : ""}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`cursor-pointer ${filter === "completed" ? "text-blue-500" : ""}`}
          >
            Completed
          </button>
        </div>
      </div>

      <p
        className={`font-medium mt-10 text-center ${
          theme === "dark" ? "text-gray-500" : "text-gray-600"
        }`}
      >
        Drag and drop to reorder list
      </p>
    </>
  );
}
