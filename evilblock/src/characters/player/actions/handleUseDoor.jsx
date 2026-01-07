import { useCutsceneStore } from "../../../stores/useCutsceneStore";
import { useGameStore } from "../../../stores/useGameStore";

export const handleUseDoor = (door) => {
    // Handle other things here
    console.log("Before", door)
    const doorInformation = door.extra;
    const { cutscene, lock } = doorInformation;


    if (cutscene) {
        const shouldPlayCutscene = useCutsceneStore.getState().shouldCutscenePlay(cutscene)
        if (shouldPlayCutscene) {
            console.log("Cutscene is meant to be played", shouldPlayCutscene)
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