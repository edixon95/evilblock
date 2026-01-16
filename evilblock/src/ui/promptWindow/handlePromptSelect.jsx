import { DOOR } from "../../constants/doorConstants";
import { PROP, USE } from "../../data/interact/interactConstants";
import { getItem } from "../../data/interact/items/itemTable";
import { useGameStore } from "../../stores/useGameStore";
import { useInventoryStore } from "../../stores/useInventoryStore";
import { usePropStore } from "../../stores/usePropStore";
import { handlePropAddItem } from "./actions/handlePropAddItem";
import { handlePropDoAction } from "./actions/handlePropDoAction";

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
    if (prop?.item) {
        handlePropAddItem(prop)
    } else if (prop?.action) {
        handlePropDoAction(prop)
    }

}

export const handlePromptSelect = (data) => {
    if (data?.itemType === DOOR) {
        handleDoor(data.item)
    } else if (data?.itemType === PROP) {
        handleProp(data.item)
    }
}