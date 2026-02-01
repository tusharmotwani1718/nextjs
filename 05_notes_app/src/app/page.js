import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FetchNotes } from "../../lib/data/fetch-notes/fetchNotes.js";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import AddNoteToggle from "../../_components/AddNoteToggle.jsx";

export function CardSmall({
  title,
  description,
  status
}) {
  return (
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Badge className={`${status ? 'text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'}`}>
          {status ? "Completed" : "Not Completed"}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Toggle
        </Button>
      </CardFooter>
    </Card>
  )
}


export default async function Home() {

  const notes = await FetchNotes();


  return (

    <div className="">
      <main className="p-5 text-blue-700 space-y-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Next Notes
        </h1>
        <AddNoteToggle />
        <div className="max-w-7xl mx-auto flex flex-wrap gap-7 my-4 p-5 justify-start items-start">
          {
            notes && notes.map((note) => (
              <CardSmall key={note._id} title={note.title} description={note.description} status={note.status} />
            ))
          }
        </div>
      </main>
    </div>
  );
}
