import { useState, useEffect } from "react";
import { useGameStore } from "../stores/useGameStore";
import { getDoorInfo } from "../data/doors/doorTable";
import { handleSetPlayerPosition, handleSetPlayerRotation } from "../helpers/handleSetPlayer";
import { getDoorData } from "../data/floors/levelTable";
import { getSpawnPosition, isUpDirectionStairs } from "../helpers/getSpawnPosition";
import { DOOR, STAIR, UP } from "../constants/doorConstants";
import { useDoorStore } from "../stores/useDoorStore";


export const TransitionManager = ({ playerRef }) => {
    const data = useGameStore((state) => state.gameState?.data);
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        if (!data) return;

        // Check if the new data is a door event
        if (data.type === "DOOR" || data.type === "STAIR") {
            const { level, room, door } = data.extra.to
            const destinationFromStore = useDoorStore.getState().handleGetDoorData(level, room, door)
            // // TOOD: Hide
            useGameStore.getState().handleChangeLevel(level, room)
            handleSetPlayerPosition(playerRef, getSpawnPosition(destinationFromStore))
            handleSetPlayerRotation(playerRef, destinationFromStore.direction, destinationFromStore.type === DOOR, isUpDirectionStairs(destinationFromStore))
            useGameStore.getState().handleClearData()
            return;
        }
    }, [data]);

    if (!visible) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "black",
                opacity: 1,
                pointerEvents: "none",
                zIndex: 9999,
            }}
        />
    );
};
