import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useWorldStore = create((set, get) => ({
    world: extractFromLevelTable("geometry"),

    handleLoadWorld: () => {

    },

    handleSaveWorld: () => {

    }
}))
