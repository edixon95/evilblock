import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useLightStore = create((set, get) => ({
    lights: extractFromLevelTable("lights"),
}))
