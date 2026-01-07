import { useGameStore } from "../../../stores/useGameStore";

export const handleUseDoor = (door) => {
    // Handle other things here
    console.log("Before", door)
    const doorInformation = door.extra;
    const { cutscene, lock } = doorInformation;

    if (lock.isLocked) {
        console.log("Door Locked")
        return
    }

    if (cutscene.id && cutscene.active) {
        console.log("Cutscene to play")
        return;
    }

    useGameStore.getState().handleAddData(door)
}