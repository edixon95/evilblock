import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useItemStore = create((set, get) => ({
    items: extractFromLevelTable("items"),
}))
