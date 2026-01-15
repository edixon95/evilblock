import { DOOR } from "../../constants/doorConstants";
import { PROP, USE } from "../../data/interact/interactConstants";
import { getItem } from "../../data/interact/items/itemTable";
import { useGameStore } from "../../stores/useGameStore";
import { useInventoryStore } from "../../stores/useInventoryStore";
import { usePropStore } from "../../stores/usePropStore";

const handleDoor = (door) => {
    if (door.extra.lock.isLocked) {
        const data = {
            target: door,
            type: USE,
        }

        useGameStore.getState().handleOpenMenu("pause:inventory", data)
        return
    }

    useGameStore.getState().handleAddData(door);
}

const handleProp = (prop) => {
    if (useInventoryStore.getState().hasInventorySpace()) {
        const item = getItem(prop.item)
        useInventoryStore.getState().tryAddInventory(item)

        const tempPrompt = {
            prop,
            prompt: {
                ...prop.success,
                text: `You take the ${item.name}`,
            },
            type: "PROMPT",
            itemType: PROP,
        };

        const { level, room } = useGameStore.getState().gameState.game
        usePropStore.getState().tryCollectFromProp(level, room, prop.id)
        useGameStore.getState().handleAddData(tempPrompt)
    }
}

export const handlePromptSelect = (data) => {
    if (data?.itemType === DOOR) {
        handleDoor(data.item)
    } else if (data?.itemType === PROP) {
        handleProp(data.item)
    }
}