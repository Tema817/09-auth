import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteModalPageProps): Promise<Metadata> {
  const { id } = await params;
  const response = await fetchNoteById(id);
  const note = response.data;
  return {
    title: `Note ${note.title}`,
    description: `${note.content.slice(0, 30)}`,
    openGraph: {
      title: `Note ${note.title}`,
      description: `${note.content.slice(0, 30)}`,
      url: `https://08-zustand-budsk7974-temas-projects-820b2b53.vercel.app/notes/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const response = await fetchNoteById(id);
      return response.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}