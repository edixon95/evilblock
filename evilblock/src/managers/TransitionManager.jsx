import { useState, useEffect } from "react";
import { useGameStore } from "../stores/useGameStore";
import { handleSetPlayerPosition, handleSetPlayerRotation } from "../helpers/handleSetPlayer";
import { getSpawnPosition, isUpDirectionStairs } from "../helpers/getSpawnPosition";
import { DOOR } from "../constants/doorConstants";
import { useDoorStore } from "../stores/useDoorStore";
import { useEnemyStore } from "../stores/useEnemyStore";


export const TransitionManager = ({ playerRef }) => {
    const data = useGameStore((state) => state.gameState?.data);
    const [visible, setVisible] = useState(false);

    const handleSetVisit = () => setVisible((prev) => !prev)
    useEffect(() => {
        if (!data) return;

        // Check if the new data is a door event
        if (data.type === "DOOR" || data.type === "STAIR") {
            const game = useGameStore.getState().gameState.game;
            const { level, room, door } = data.extra.to
            const destinationFromStore = useDoorStore.getState().handleGetDoorData(level, room, door)
            // // TOOD: Hide
            useEnemyStore.getState().resetEnemies(game.level, game.room);
            useGameStore.getState().handleChangeFade(true)
            useGameStore.getState().handleChangeLevel(level, room)
            handleSetVisit()
            handleSetPlayerPosition(playerRef, getSpawnPosition(destinationFromStore))
            handleSetPlayerRotation(playerRef, destinationFromStore.direction, destinationFromStore.type === DOOR, isUpDirectionStairs(destinationFromStore))
            useGameStore.getState().handleClearData()
            setTimeout(() => {
                useGameStore.getState().handleChangeFade(false)
                handleSetVisit()
            }, 500)
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
