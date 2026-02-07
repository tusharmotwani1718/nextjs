import ClientComponent from "@/[_components]/ClientComponent";
import ServerComponent from "@/[_components]/ServerComponent";
import Image from "next/image";

async function createNote({ note }) {
  'use server';
  // any server action here:
  // await db.create(note);
}

export default function Home() {
  return (
    <div>
      <ServerComponent />
      <ClientComponent />
    </div>
  );
}
