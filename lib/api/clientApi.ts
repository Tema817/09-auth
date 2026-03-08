import { nextServer as api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import type { FetchNotesResponse, NoteTag } from "@/types/note";

// ---- AUTH ----
export const register = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", { email, password });
  return data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", { email, password });
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get<User | null>("/auth/session");
  return data;
};

// ---- USER ----
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (username: string): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", { username });
  return data;
};

// ---- NOTES ----
export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  tag?: NoteTag,
  search?: string,
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage, tag },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: { title: string; content: string; tag: string }): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};