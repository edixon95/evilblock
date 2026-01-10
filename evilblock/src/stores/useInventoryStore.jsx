import { create } from "zustand"
import { ITEM_TABLE } from "../data/interact/items/itemTable";

export const useInventoryStore = create((set, get) => ({
    inventory: Array(12).fill(null),

    hasInventorySpace: () => {
        const { inventory } = get();

        return inventory.includes(null)
    },

    tryAddInventory: (item) => {
        const { inventory } = get();

        for (let i = 0; i < inventory.length; i++) {
            if (!inventory[i]) {
                const newInventory = [...inventory];
                newInventory[i] = item;

                set({ inventory: newInventory });
                return item;
            }
        }

        return false;
    },

    tryCraftByIndex: (itemAIndex, itemBIndex, reward) => {
        const { inventory } = get()
        const newInventory = [...inventory];
        newInventory[itemAIndex] = null;
        newInventory[itemBIndex] = ITEM_TABLE[reward]
        set({ inventory: newInventory })
    }
}))
