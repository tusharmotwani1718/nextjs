import dbConnect from "../../lib/db/dbConnect";
import AddTodoForm from "../../[_components]/AddTodoForm.jsx";
import DisplayTodos from "../../[_components]/DisplayTodos";
import { Suspense } from "react";

export default async function Home() {
  await dbConnect();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-6">
      <AddTodoForm />
      <DisplayTodos />
    </div>
  );
}
