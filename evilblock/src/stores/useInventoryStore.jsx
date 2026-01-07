import { create } from "zustand"

export const useInventoryStore = create((set, get) => ({
    inventory: [],
}))
