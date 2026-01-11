import { useGameStore } from "../../../../stores/useGameStore"
import { useInventoryStore } from "../../../../stores/useInventoryStore"
import { useItemStore } from "../../../../stores/useItemStore"

const markCollected = (item) => {
    const { level, room } = useGameStore.getState().gameState.game
    useItemStore.getState().handleMarkItemCollected(level, room, item.userData.id)
}

export const tryPickupItem = (item) => {
    if (useInventoryStore.getState().hasInventorySpace() && useInventoryStore.getState().tryAddInventory(item.userData)) {
        markCollected(item);
    } else {
        console.log("I do not have space")
    }
}

export const tryPickupWepon = (item) => {
    if (useInventoryStore.getState().hasInventorySpace()) {
        // TODO: Generate bullet count
        const randomAmmoCount = 5
        // Update currentAmmo
        item.userData.data.currentAmmo = randomAmmoCount
        useInventoryStore.getState().tryAddInventory(item.userData)

        markCollected(item);
    }
}