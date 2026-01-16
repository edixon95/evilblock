import { DOOR, STAIR } from "../../constants/doorConstants";
import { useDoorStore } from "../../stores/useDoorStore";
import { useGameStore } from "../../stores/useGameStore";
import { useInventoryStore } from "../../stores/useInventoryStore";

const isKeyValid = (item, required) => {
    return item === required
}

export const handleUseItemOnTarget = (item, inventoryIdx) => {
    const data = useGameStore.getState().gameState?.data
    const { level, room } = useGameStore.getState().gameState.game
    if (data.target.type === DOOR || data.target.type === STAIR) {
        if (isKeyValid(item.name, data.target.extra.lock.required)) {
            useGameStore.getState().handleCloseMenu() // Close the menu
            useInventoryStore.getState().tryRemoveInventory(inventoryIdx) // Takethe players item
            useDoorStore.getState().handleUnlockDoor(level, room, data.target.id) // Set isSeen and unlocked
            // TODO: Will need a regular set isSeen

            // Get most up to date room since we just changed it and it has to run through the prompt window again
            const door = useDoorStore.getState().handleGetDoorData(level, room, data.target.id)

            // Override the text just this once
            const editedText = `You used the ${item.name}.`
            const copyPrompt = {
                ...door.extra.success,
                text: `${editedText} ${door.extra.success.text}`,
            }

            const tempPrompt = {
                item: door,
                prompt: copyPrompt,
                type: "PROMPT",
                itemType: DOOR
            }

            useGameStore.getState().handleAddData(tempPrompt)
        }
    }

}