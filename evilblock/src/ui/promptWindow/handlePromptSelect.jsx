import { DOOR } from "../../constants/doorConstants";
import { USE } from "../../data/interact/interactConstants";
import { useGameStore } from "../../stores/useGameStore";

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

export const handlePromptSelect = (data) => {
    if (data?.itemType === DOOR) {
        handleDoor(data.item)
    }
}