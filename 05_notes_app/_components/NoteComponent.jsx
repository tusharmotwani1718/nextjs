'use client';
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";



export function NoteComponent({
    title,
    description,
    status,
    id
}) {

    const router = useRouter();


    const deleteNote = async (id) => {

        try {
            const response = await fetch(`/api/notes/delete-note/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                toast.error('Error deleting note');
                return;
            }

            router.refresh();

            toast.success("Note deleted successfully!");
        } catch (error) {
            console.error(error);
            toast.error('Error deleting note')
        }
    }

    const toggleStatus = async (id) => {
        try {
            const response = await fetch(`/api/notes/toggle-status/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                toast.error('Error updating note');
                return;
            }

            router.refresh();

            toast.success("Note updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error('Error updating note')
        }
    }



    return (
        <Card size="sm" className="w-full max-w-sm relative">
            <Button variant="outline" size="sm" className="absolute top-2 right-3" onClick={() => deleteNote(id)}>
                <Trash />
            </Button>
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
                <Button variant="outline" size="sm" className="w-full" onClick={() => toggleStatus(id)}>
                    Toggle
                </Button>
            </CardFooter>
        </Card>
    )
}