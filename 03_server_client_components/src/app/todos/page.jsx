import LikeButton from "./_components/LikeButton";

export default async function Todos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await res.json();


  return (
    <section className="flex h-screen items-center justify-center">
        <div className="flex container flex-col gap-3 max-h-[55vh] overflow-y-auto border-2 border-blue-600 mx-auto w-max p-4">
      <h2 className="italic text-xl font-bold text-gray-400">Todos will appear here</h2>

      {todos?.length > 0 &&
        todos.map((todo) => (
          <div key={todo.id} className="flex gap-3 items-center border rounded-md border-green-500 p-3">
            <h3>{todo.title}</h3>
            <span className="text-white bg-yellow-400 font-semibold rounded-sm px-4 py-2">{todo.completed ? '✅ Done' : '❌ Pending'}</span>
            <LikeButton todoId={todo.id} userId={todo.userId} />
          </div>
        ))}
    </div>
    </section>
  );
}
