'use client';



import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";





export function AddNoteDialog() {

  const [closeDialog, setCloseDialog] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      

      const response = await fetch("/api/notes/add-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          desc: data.description
        })
      });


      if (!response.ok) {
        console.error("Failed to save note");
        toast.error("Error Creating Note");
        return;
      }



      // optionally close dialog here via state
      toast("Note created successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Error Creating Note");
    } finally {
      setCloseDialog(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" onClick = {() => setCloseDialog(false)}>
          Add Note
        </Button>
      </DialogTrigger>

      {
        !closeDialog && (
          <DialogContent className="sm:max-w-sm">
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
                <DialogDescription>
                  Fill out the info to create a new note
                </DialogDescription>
              </DialogHeader>

              <FieldGroup>
                <Field>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue="New Note" />
                </Field>

                <Field>
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" name="desc" />
                </Field>
              </FieldGroup>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>

                <Button type="submit">Save changes</Button>
              </DialogFooter>

            </form>
          </DialogContent>
        )
      }
    </Dialog>
  );
}



export default function AddNoteToggle() {

  return (
    <div className="space-y-4">
      <AddNoteDialog />
    </div>
  );
}
