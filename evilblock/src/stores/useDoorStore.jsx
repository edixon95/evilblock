import { create } from "zustand"
import { extractFromLevelTable, LEVEL_TABLE } from "../data/floors/levelTable"

export const useDoorStore = create((set, get) => ({
    doors: extractFromLevelTable("doors"),

    handleGetDoorData: (level, room, id) => {
        const { doors } = get();
        return doors[level][room].find((x) => x.id === id)
    }
}))
