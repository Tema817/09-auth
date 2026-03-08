import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import type { FetchNotesResponse } from "@/types/note";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

async function fetchWithCookies<T>(url: string, options?: RequestInit): Promise<T> {
  const cookieStore = cookies();
  const res = await fetch(baseURL + url, {
    ...options,
    headers: {
      ...options?.headers,
      Cookie: cookieStore.toString(),
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

// ---- AUTH ----
export const checkSession = async (): Promise<User | null> =>
  fetchWithCookies<User | null>("/auth/session");

export const getMe = async (): Promise<User> =>
  fetchWithCookies<User>("/users/me");

// ---- NOTES ----
export const fetchNotes = async (
    page: number = 1,
    perPage: number = 12,
    tag?: string,
    search?: string
): Promise<FetchNotesResponse> =>
    fetchWithCookies<FetchNotesResponse>(
        `/notes?search=${search ?? ""}&page=${page}&perPage=${perPage}&tag=${tag ?? ""}`
    );

export const fetchNoteById = async (id: string): Promise<Note> =>
  fetchWithCookies<Note>(`/notes/${id}`);