import { useGameStore } from "../../../stores/useGameStore";

export const handleUseDoor = (door) => {
    // Handle other things here
    useGameStore.getState().handleAddData(door)
}