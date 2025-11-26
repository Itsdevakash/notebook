import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNote = create(
  persist(
    (set) => ({
      notes: [],

      setNote: (payload) =>
        set((state) => ({
          notes: [...state.notes, payload],
        })),

      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((item) => item.id !== id),
        })),

      updateNote: (id, payload) =>
        set((state) => ({
          notes: state.notes.map((item) =>
            item.id === id
              ? { ...item, ...payload }
              : item
          ),
        })),
    }),
    { name: "notebook" }
  )
);
