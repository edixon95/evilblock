import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useEnemyStore = create((set, get) => ({
    world: extractFromLevelTable("enemies"),
}))
