import type { LoaderFunctionArgs, ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks} from "~/components/NewNote"
import NoteLinks, { links as noteListLinks} from "~/components/NoteList"
import { getStoredNotes, storeNotes } from "~/data/notesStoreData"

export default function NotesPage() {
    const notes = useLoaderData<typeof loader>();

    return (
        <main>
            <NewNote />
            <NoteLinks notes={notes} />
        </main>
    )
}

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const notes = await getStoredNotes();
  return notes;
}

export const action = async ({ 
    request 
  }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);
    if (noteData.title.trim().length < 5) {
      return { message: "Invalid title - must be at least 5 characters"}
    }
    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return redirect("/notes"); 
  };

export const links: LinksFunction = () => [
    ...newNoteLinks(), 
    ...noteListLinks(),
  ];
