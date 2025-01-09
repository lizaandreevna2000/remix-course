import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from '@remix-run/react';
import { getStoredNotes } from "~/data/notesStoreData";


import styles from '~/styles/note-details.css'; 


export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  console.log(notes);
  const selecteNote = notes?.find(note => note.id === noteId);
  return selecteNote;
};

export default function NoteDetailsPage() {
  const { note } = useLoaderData<typeof loader>(); 
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note?.title}</h1>
      </header>
      <p id="note-details-content">{note?.content}</p>
    </main>
  ); 
}
 
export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles }
];

