import { PROP } from "../../../../data/interact/interactConstants";
import { useGameStore } from "../../../../stores/useGameStore";

export const handlePropInteract = (item) => {
    let prompt;
    if (item.userData.item) {
        prompt = !item.userData.isCollected ? item.userData.prompt : item.userData.success
    } else {
        prompt = item.userData.success
    }

    const tempPrompt = {
        item: item.userData,
        prompt,
        type: "PROMPT",
        itemType: PROP
    }

    useGameStore.getState().handleAddData(tempPrompt)
}