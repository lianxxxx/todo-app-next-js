export default function TodoInput() {
  return (
    <div className="flex items-center bg-white rounded-lg p-3 border-0 w-full">
      {/* Fake radio/circle */}
      <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-4 shrink-0"></div>

      {/* Input */}
      <input
        type="text"
        placeholder="Create a new todo..."
        className="outline-none flex-1"
      />
    </div>
  );
}
