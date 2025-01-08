import type { LoaderFunctionArgs, ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData,  useRouteError, isRouteErrorResponse } from "@remix-run/react";
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json({ message: "No notes found. Please add some notes!" }, { status: 404 });
  }

  return notes;
};


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

  export function ErrorBoundary() {
    const error = useRouteError();
  
    if (isRouteErrorResponse(error)) {
      return (
        <main>
          <NewNote />
          <p className="info-message">{error.data?.message || "Something went wrong!"}</p>
        </main>
      );
    }
  
    return (
      <main>
        <NewNote />
        <p className="info-message">An unexpected error occurred.</p>
      </main>
    );
  }