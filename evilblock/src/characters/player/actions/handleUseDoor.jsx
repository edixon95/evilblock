import { useCutsceneStore } from "../../../stores/useCutsceneStore";
import { useGameStore } from "../../../stores/useGameStore";

export const handleUseDoor = (door) => {
    // Handle other things here
    const doorInformation = door.extra;
    const { cutscene, lock } = doorInformation;

    if (cutscene) {
        if (useCutsceneStore.getState().shouldCutscenePlay(cutscene)) {
            console.log("Cutscene is meant to be played", cutscene)
            return;
        } else {
            console.log("No cutscene active for this door")
        }
    }

    if (lock.isLocked || door.extra.prompt || door.extra.success) {
        handleInteractionPrompt(door)
        return
    }

    useGameStore.getState().handleAddData(door)
}

export const handleInteractionPrompt = (door) => {
    // If the text always show or hasn't been seen
    // Notes on how this works in doorsTable.jsx
    if (door.extra.alwaysShow || !door.extra.isSeen) {
        // Use the correct prompt
        const promptToShow = door.extra.lock.isLocked ? door.extra.prompt : door.extra.success
        const tempPrompt = {
            door,
            prompt: promptToShow,
            type: "PROMPT"
        }

        useGameStore.getState().handleAddData(tempPrompt)
        return
    }
    // If the door isn't locked, has a prompt, but the prompt has been seen, just use the door normally
    useGameStore.getState().handleAddData(door)
}