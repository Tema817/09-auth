import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

interface NotesPageProps {
  params: { slug: string[] };
}

// SEO мета-дані
export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const tag = params.slug?.[0] ?? "all";
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `${capitalizedTag} Notes | NoteHub`,
    description: `Browse notes tagged with: ${capitalizedTag}.`,
    openGraph: {
      title: `${capitalizedTag} Notes | NoteHub`,
      description: `Browse notes tagged with: ${capitalizedTag}.`,
      url: `/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

// Сторінка з SSR prefetch
export default async function NotesPage({ params }: NotesPageProps) {
  const tag = params.slug?.[0] ?? "all";

  const queryClient = new QueryClient();

  // Prefetch даних для React Query
  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: async () => {
      const response = await fetchNotes(1, 12, tag === "all" ? undefined : (tag as NoteTag));
      return response.data;
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
