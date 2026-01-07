import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useStationStore = create((set, get) => ({
    world: extractFromLevelTable("stations"),
}))
