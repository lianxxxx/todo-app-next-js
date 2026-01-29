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
function SortableItem({ todo, toggleTodo, deleteTodo }) {
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
      className="flex items-center p-4 px-6 border-b border-gray-300 last:border-b-0"
    >
      {/* Circle - clickable only */}
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`relative w-5 h-5 border rounded-full mr-4 shrink-0 transition-colors cursor-pointer
          ${todo.completed ? "check-gradient" : "border-gray-300 hover:border-purple-400"}`}
      />

      {/* Todo text - THIS is the drag handle */}
      <span
        {...attributes}
        {...listeners}
        className={`flex-1 transition-all duration-300 cursor-grab active:cursor-grabbing ${
          todo.completed
            ? "line-through text-purple-300 font-light"
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
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
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
      <div className="bg-white rounded-lg w-full shadow-lg mt-4">
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
                />
              ))}

              {/* Footer */}
              <li className="flex justify-between items-center p-4 text-sm text-gray-600">
                <span>
                  {todos.filter((todo) => !todo.completed).length} items left
                </span>

                {/* Desktop filters */}
                <div className="hidden md:flex gap-4 font-semibold">
                  <button
                    onClick={() => setFilter("all")}
                    className={filter === "all" ? "text-blue-500" : ""}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("active")}
                    className={filter === "active" ? "text-blue-500" : ""}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter("completed")}
                    className={filter === "completed" ? "text-blue-500" : ""}
                  >
                    Completed
                  </button>
                </div>

                <button onClick={clearCompleted}>Clear Completed</button>
              </li>
            </ul>
          </SortableContext>
        </DndContext>
      </div>

      {/* Mobile filters */}
      <div className="md:hidden mt-4 p-3 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center gap-4 text-sm font-semibold text-gray-400">
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? "text-blue-500" : ""}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={filter === "active" ? "text-blue-500" : ""}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "text-blue-500" : ""}
          >
            Completed
          </button>
        </div>
      </div>

      <p className="font-medium mt-10 text-center text-gray-600">
        Drag and drop to reorder list
      </p>
    </>
  );
}
