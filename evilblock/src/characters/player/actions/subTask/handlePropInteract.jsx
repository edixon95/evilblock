import { PROP } from "../../../../data/interact/interactConstants";
import { useGameStore } from "../../../../stores/useGameStore";
import { handleCreatePrompt } from "../../../../tool/handleCreatePrompt";

export const backupPrompt = handleCreatePrompt("There's nothing here worth looking at.", "CONFIRMATION", false, "Back")

export const getPrompt = (item) => {
    let prompt;

    if (item.userData.action) {
        prompt = !item.userData.action.isComplete ? item.userData.prompt : item.userData.success
    } else if (item.userData.success) {
        if (item.userData.item) {
            prompt = !item.userData.isCollected ? item.userData.prompt : item.userData.success
        } else {
            prompt = item.userData.success
        }
    } else {
        prompt = backupPrompt
    }
    return prompt
}

const handleExamineProp = (item) => {
    const tempPrompt = {
        item: item.userData,
        prompt: getPrompt(item),
        type: "PROMPT",
        itemType: PROP
    }

    useGameStore.getState().handleAddData(tempPrompt)
}

export const handlePropInteract = (item) => {
    if (!item?.userData?.canExamine && !item?.userData?.action)
        return

    handleExamineProp(item)


}