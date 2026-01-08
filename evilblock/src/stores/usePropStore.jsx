import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const usePropStore = create((set, get) => ({
    props: extractFromLevelTable("props"),
}))
