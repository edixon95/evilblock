import { create } from "zustand"

export const useCutsceneStore = create((set, get) => ({
    cutscenes: []
}))
