import { useState, useEffect } from "react";
import { useGameStore } from "../stores/useGameStore";
import { getDoorInfo } from "../data/doors/doorTable";
import { handleSetPlayerPosition, handleSetPlayerRotation } from "../helpers/handleSetPlayer";
import { getDoorData } from "../data/floors/levelTable";
import { getSpawnPosition } from "../helpers/getSpawnPosition";
import { DOOR, STAIR, UP } from "../constants/doorConstants";


export const TransitionManager = ({ playerRef }) => {
    const data = useGameStore((state) => state.gameState?.data);
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        if (!data) return;

        // Check if the new data is a door event
        if (data.type === "DOOR" || data.type === "STAIR") {
            const { level, room, door } = data.transferData
            const tDoor = getDoorData(level, room, door)
            const spawn = getSpawnPosition(tDoor)
            // TOOD: Hide
            const isUpDirectionStairs = tDoor.type === STAIR && tDoor.stairDirection === UP
            useGameStore.getState().handleChangeLevel(level, room)
            handleSetPlayerPosition(playerRef, spawn)
            handleSetPlayerRotation(playerRef, tDoor.direction, tDoor.type === DOOR, isUpDirectionStairs)
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
