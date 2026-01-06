import { create } from "zustand"
import { LEVEL_TABLE } from "../data/floors/levelTable"

export const useWorldStore = create((set, get) => ({
    world: LEVEL_TABLE,

    handleLoadWorld: () => {

    },

    handleSaveWorld: () => {

    }
}))
