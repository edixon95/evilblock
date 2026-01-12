import * as THREE from "three";
import { createGrid } from "./pathfinding";
import { handleCombineFloor } from "./handleCombineFloor";
import { soundBehaviour } from "./behaviour/soundBehaviour";
import { wanderBehaviour } from "./behaviour/wanderBehaviour";
import { moveBehaviour } from "./behaviour/moveBehaviour";
import { playerVisionBehaviour } from "./behaviour/playerVisionBehaviour";
import { playerChaseBehaviour } from "./behaviour/playerChaseBehaviour";
import { attackBehaviour } from "./behaviour/attackBehaviour";

const initController = {
    path: null,
    targetIndex: 0,
    idleTimer: 0,
    lostPlayerTimer: 0,
    chaseTimer: 0,
    intent: "idle",
    soundTargetId: null
}

export const createNavigation = (floors, blockableMeshes = [], getSoundEvents, playerRef) => {
    if (!floors?.length) return { pickRandomPoint: () => new THREE.Vector3(0, 0.5, 0), updateEnemy: () => { } };

    const combinedFloor = handleCombineFloor(floors)

    const grid = createGrid(combinedFloor, blockableMeshes, 0.2);
    if (!grid) return { pickRandomPoint: () => new THREE.Vector3(0, 0.5, 0), updateEnemy: () => { } };

    const pickRandomPoint = () => {
        const walkableNodes = [];
        for (let i = 0; i < grid.cols; i++)
            for (let j = 0; j < grid.rows; j++)
                if (grid.grid[i][j].walkable) walkableNodes.push(grid.grid[i][j]);
        if (!walkableNodes.length) return new THREE.Vector3(0, 0.5, 0);
        const node = walkableNodes[Math.floor(Math.random() * walkableNodes.length)];
        return new THREE.Vector3(node.worldX, 0.5, node.worldZ);
    };

    const updateEnemy = (enemy, ref, delta) => {
        if (!ref.current) return;

        if (!enemy.controller) enemy.controller = { ...initController }

        const ctrl = enemy.controller;

        const ctx = {
            enemy,
            ref,
            ctrl,
            grid,
            delta,
            getSoundEvents,
            pickRandomPoint,
            playerRef,
            blockableMeshes
        };


        playerVisionBehaviour(ctx);
        playerChaseBehaviour(ctx);
        attackBehaviour(ctx);
        soundBehaviour(ctx);
        wanderBehaviour(ctx);
        moveBehaviour(ctx);
    };



    return { pickRandomPoint, updateEnemy };
};
