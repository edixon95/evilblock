import { useGameStore } from "../../../stores/useGameStore"

export const handlePropDoAction = (prop) => {
    useGameStore.getState().handleSetAction(prop)
}