import { create } from "zustand"
import { ITEM_TABLE } from "../data/interact/items/itemTable";

export const useInventoryStore = create((set, get) => ({
    inventory: Array(12).fill(null),

    equippedItem: null, // just index

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
    },

    getEquippedInformation: () => {
        const { equippedItem, inventory } = get();
        return inventory[equippedItem] ?? false
    },

    isWeaponEquipped: (idx) => {
        const { equippedItem } = get();
        return idx === equippedItem
    },

    tryEquipWeapon: (idx) => {
        set({ equippedItem: idx })
    },

    tryUnequipWeapon: () => {
        set({ equippedItem: null })
    },

    tryShootWeapon: () => {
        const equippedWeapon = get().getEquippedInformation();
        const { equippedItem, inventory } = get();

        // Make knife path, or is there even a knife? It's very hard to use
        if (!equippedWeapon) return false;

        if (equippedWeapon.data.currentAmmo > 0) {
            const newInventory = [...inventory];

            newInventory[equippedItem] = {
                ...newInventory[equippedItem],
                data: {
                    ...newInventory[equippedItem].data,
                    currentAmmo: newInventory[equippedItem].data.currentAmmo - 1,
                },
            };

            set({ inventory: newInventory });
            return true;
        }

        return false;
    }

}))