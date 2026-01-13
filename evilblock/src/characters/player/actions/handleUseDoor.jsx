import { useCutsceneStore } from "../../../stores/useCutsceneStore";
import { useGameStore } from "../../../stores/useGameStore";

export const handleUseDoor = (door) => {
    // Handle other things here
    const doorInformation = door.extra;
    const { cutscene, lock, prompt } = doorInformation;

    if (cutscene) {
        if (useCutsceneStore.getState().shouldCutscenePlay(cutscene)) {
            console.log("Cutscene is meant to be played", cutscene)
            return;
        } else {
            console.log("No cutscene active for this door")
        }
    }

    if (lock.isLocked || prompt) {
        handleInteractionPrompt(door, prompt)
        return
    }

    useGameStore.getState().handleAddData(door)
}

export const handleInteractionPrompt = (door, prompt) => {
    const tempPrompt = {
        door,
        prompt,
        type: "PROMPT"
    }

    useGameStore.getState().handleAddData(tempPrompt)
}