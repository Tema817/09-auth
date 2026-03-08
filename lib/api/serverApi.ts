// import { nextServer } from "./api";
// import { User } from "@/types/user";
// import { Note } from "@/types/note";
// import type { FetchNotesResponse } from "@/types/note";
// import type { AxiosResponse } from "axios";

// // ---- AUTH ----
// export const checkSession = async (): Promise<User | null> => {
//   const { data } = await nextServer.get<User | null>("/auth/session", {
//     withCredentials: true,
//   });
//   return data;
// };

// // ---- USER ----
// export const getMe = async (): Promise<User> => {
//   const { data } = await nextServer.get<User>("/users/me", {
//     withCredentials: true,
//   });
//   return data;
// };

// // ---- NOTES ----
// export const fetchNotes = async (
//   page: number = 1,
//   perPage: number = 12,
//   tag?: string,
//   search?: string
// ): Promise<AxiosResponse<FetchNotesResponse>> => {
//   return nextServer.get<FetchNotesResponse>("/notes", {
//     params: { search, page, perPage, tag },
//   });
// };

// export const fetchNoteById = async (id: string): Promise<AxiosResponse<Note>> => {
//   return nextServer.get<Note>(`/notes/${id}`);
// };

// import { nextServer } from "./api";
// import { User } from "@/types/user";
// import { Note } from "@/types/note";
// import type { FetchNotesResponse } from "@/types/note";

// // ---- AUTH ----
// export const checkSession = async (): Promise<User | null> => {
//   const { data } = await nextServer.get<User | null>("/auth/session", {
//     withCredentials: true,
//   });
//   return data;
// };

// // ---- USER ----
// export const getMe = async (): Promise<User> => {
//   const { data } = await nextServer.get<User>("/users/me", {
//     withCredentials: true,
//   });
//   return data;
// };

// // ---- NOTES ----
// export const fetchNotes = async (
//   page: number = 1,
//   perPage: number = 12,
//   tag?: string,
//   search?: string
// ): Promise<FetchNotesResponse> => {
//   const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
//     params: { search, page, perPage, tag },
//     withCredentials: true,
//   });
//   return data;
// };

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const { data } = await nextServer.get<Note>(`/notes/${id}`, {
//     withCredentials: true,
//   });
//   return data;
// };

import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note, FetchNotesResponse } from "@/types/note";
import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";

// ---- AUTH ----
export const checkSession = async (): Promise<AxiosResponse<User | null>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  return nextServer.get<User | null>("/auth/session", {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });
};

// ---- USER ----
export const getMe = async (): Promise<AxiosResponse<User>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  return nextServer.get<User>("/users/me", {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });
};

// ---- NOTES ----
export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  tag?: string,
  search?: string
): Promise<AxiosResponse<FetchNotesResponse>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  return nextServer.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage, tag },
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });
};

export const fetchNoteById = async (id: string): Promise<AxiosResponse<Note>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  return nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  });
};