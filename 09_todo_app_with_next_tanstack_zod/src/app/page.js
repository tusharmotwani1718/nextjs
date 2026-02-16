import dbConnect from "../../lib/db/dbConnect";
import AddTodoForm from "../../[_components]/AddTodoForm.jsx";

export default async function Home() {
  await dbConnect();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <AddTodoForm />

    </div>
  );
}
