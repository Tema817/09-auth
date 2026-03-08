import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: typeof initialDraft;
  setDraft: (note: Partial<typeof initialDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: "note-draft" }
  )
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { NoteFormData } from "@/types/note";

// type NoteDraftStore = {
//   draft: NoteFormData;
//   setDraft: (note: NoteFormData) => void;
//   clearDraft: () => void;
// };

// const initialDraft: NoteFormData = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

// export const useNoteDraftStore = create<NoteDraftStore>()(
//   persist(
//     (set) => ({
//       draft: initialDraft,
//       setDraft: (note) => set(() => ({ draft: note })),
//       clearDraft: () => set(() => ({ draft: initialDraft })),
//     }),
//     {
//       name: "note-draft",
//       partialize: (state) => ({ draft: state.draft }),
//     }
//   )
// );