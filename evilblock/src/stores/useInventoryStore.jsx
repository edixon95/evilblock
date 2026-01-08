import { create } from "zustand"

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
    }
}))
