import { create } from "zustand";
import { combine } from "zustand/middleware";
import data from "../assets/data";

export const store = create(
  combine(
    { addEventPop: false, events: data, startDate: null },
    (set, get) => ({
      toggleAddEventPop: (val) => set({ addEventPop: val }),
      setNewEvent: (val) =>
        set((state) => ({ events: [...state.events, val] })),
      setStartDate: (val) => set({ startDate: val }),
      deleteEvent: (val) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== val),
        })),
    })
  )
);
