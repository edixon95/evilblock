import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useCameraStore = create((set, get) => ({
    cameras: extractFromLevelTable("cameras"),
}))
