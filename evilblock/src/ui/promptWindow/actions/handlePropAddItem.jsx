import { PROP } from "../../../data/interact/interactConstants";
import { getItem } from "../../../data/interact/items/itemTable";
import { useGameStore } from "../../../stores/useGameStore";
import { useInventoryStore } from "../../../stores/useInventoryStore";
import { usePropStore } from "../../../stores/usePropStore";

export const handlePropAddItem = (prop) => {
    if (useInventoryStore.getState().hasInventorySpace()) {
        const item = getItem(prop.item)
        useInventoryStore.getState().tryAddInventory(item)

        const tempPrompt = {
            prop,
            prompt: {
                ...prop.success,
                text: prop?.customText ?? `You take the ${item.name}`,
            },
            type: "PROMPT",
            itemType: PROP,
        };

        const { level, room } = useGameStore.getState().gameState.game
        usePropStore.getState().tryCollectFromProp(level, room, prop.id)
        useGameStore.getState().handleAddData(tempPrompt)
    }
}