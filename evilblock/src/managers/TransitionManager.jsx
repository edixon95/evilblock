import { useState, useEffect } from "react";
import { useGameStore } from "../stores/useGameStore";
import { handleSetPlayerPosition, handleSetPlayerRotation } from "../helpers/handleSetPlayer";
import { getSpawnPosition, isUpDirectionStairs } from "../helpers/getSpawnPosition";
import { DOOR } from "../constants/doorConstants";
import { useDoorStore } from "../stores/useDoorStore";
import { useEnemyStore } from "../stores/useEnemyStore";

import "./css/transitionManager.css"


export const TransitionManager = ({ playerRef }) => {
    const data = useGameStore((state) => state.gameState?.data);
    const fade = useGameStore((state) => state.gameState?.fade)

    useEffect(() => {
        if (!data || (data.type !== "DOOR" && data.type !== "STAIR")) return;
        const game = useGameStore.getState().gameState.game;
        const { level, room, door } = data.extra.to
        const destinationFromStore = useDoorStore.getState().handleGetDoorData(level, room, door)
        // // TOOD: Hide
        useEnemyStore.getState().resetEnemies(game.level, game.room);
        useGameStore.getState().handleChangeFade(true)
        useGameStore.getState().handleChangeLevel(level, room)
        handleSetPlayerPosition(playerRef, getSpawnPosition(destinationFromStore))
        handleSetPlayerRotation(playerRef, destinationFromStore.direction, destinationFromStore.type === DOOR, isUpDirectionStairs(destinationFromStore))
        useGameStore.getState().handleClearData()
        setTimeout(() => {
            useGameStore.getState().handleChangeFade(false)
        }, 500)
        return;
    }, [data]);

    if (!fade) return null;

    return (
        <div id="transition-manager"
        />
    );
};
