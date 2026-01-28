import BgImage from "@/components/BgImage";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-w-full">
      <section className="relative">
        <BgImage />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full px-6 max-w-xl">
          <TodoInput />
          <TodoList />
        </div>
      </section>
    </main>
  );
}
