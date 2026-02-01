
import { FetchNotes } from "../../lib/data/fetch-notes/fetchNotes.js";
import AddNoteToggle from "../../_components/AddNoteToggle.jsx";
import { NoteComponent } from "../../_components/NoteComponent.jsx";






export default async function Home() {

  const notes = await FetchNotes();


  return (

    <div className="">
      <main className="p-5 space-y-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Next Notes
        </h1>
        <AddNoteToggle />
        <div className="max-w-7xl mx-auto flex flex-wrap gap-7 my-4 p-5 justify-start items-start">
          {
            notes && notes.length > 0 ? (
              notes.map((note) => (
                <NoteComponent key={note._id} id={note._id.toString()} title={note.title} description={note.description} status={note.isCompleted} />
              ))
            ) : (
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
                Your Added notes will appear here
              </h1>

            )
          }
        </div>
      </main>
    </div>
  );
}
