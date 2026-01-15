import { PROP } from "../../../../data/interact/interactConstants";
import { useGameStore } from "../../../../stores/useGameStore";
import { handleCreatePrompt } from "../../../../tool/handleCreatePrompt";

export const backupPrompt = handleCreatePrompt("There's nothing here worth looking at.", "CONFIRMATION", false, "Back")

export const handlePropInteract = (item) => {
    let prompt;

    if (item.userData.success) {
        if (item.userData.item) {
            prompt = !item.userData.isCollected ? item.userData.prompt : item.userData.success
        } else {
            prompt = item.userData.success
        }
    } else {
        prompt = backupPrompt
    }

    const tempPrompt = {
        item: item.userData,
        prompt,
        type: "PROMPT",
        itemType: PROP
    }

    useGameStore.getState().handleAddData(tempPrompt)
}