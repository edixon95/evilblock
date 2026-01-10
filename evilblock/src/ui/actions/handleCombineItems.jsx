import { COMBINE, RELOAD } from "../../data/interact/interactConstants"
import { useInventoryStore } from "../../stores/useInventoryStore"

export const handleCombineItems = (itemAIndex, itemBIndex, combineData) => {
    if (combineData.type === COMBINE) {
        useInventoryStore.getState().tryCraftByIndex(itemAIndex, itemBIndex, combineData.output)
        return
    }

    if (combineData.type === RELOAD) {
        // ammo:
        //  data: {
        //         minimumAmmo: 1,
        //         maximumAmmo: 10,
        //     },
        //     examine: "This is a weapon ammo, woof woof.",
        //     combine: {
        //         [weaponConstants.COLT]: {
        //             type: RELOAD,
        //             weapons: [weaponConstants.COLT]
        //         }
        //     },

        // weapon:
        // data: {
        //         damage: 10,
        //         maximumAmmo: 10,
        //         currentAmmo: 0,
        //         delay: 3
        //     },
        //     examine: "This is a weapon, meow.",
        //     combine: {
        //         [ammoConstants.HANDGUNAMMO]: {
        //             type: RELOAD,
        //             weapons: [weaponConstants.COLT]
        //         }
        //     },
    }
}