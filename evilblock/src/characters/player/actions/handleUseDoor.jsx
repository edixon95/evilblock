import { useCutsceneStore } from "../../../stores/useCutsceneStore";
import { useGameStore } from "../../../stores/useGameStore";

export const handleUseDoor = (door) => {
    // Handle other things here
    console.log("Before", door)
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

    if (lock.isLocked) {
        console.log("Door Locked")
        return
    }

    useGameStore.getState().handleAddData(door)
}