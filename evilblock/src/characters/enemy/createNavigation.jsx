import * as THREE from "three";
import { createGrid, findPath } from "./pathfinding";
import { handleCombineFloor } from "./handleCombineFloor";
import { stingometer } from "../../helpers/stingometer"
import { findSoundTarget } from "./behaviour/findSoundTarget";

const initController = {
    path: null,
    targetIndex: 0,
    idleTimer: 0,
    intent: "idle",
    soundTargetId: null
}

export const createNavigation = (floors, blockableMeshes = [], getSoundEvents) => {
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

        if (!enemy.controller) enemy.controller = { ...initController };
        const ctrl = enemy.controller;


        // Try to acquire sound target first
        if (ctrl.intent !== "player") {
            const soundResult = findSoundTarget(enemy, ref, getSoundEvents, grid);
            if (soundResult) {
                ctrl.path = soundResult.path;
                ctrl.targetIndex = 0;
                ctrl.intent = "sound";
                ctrl.soundTargetId = soundResult.soundId;
                ctrl.idleTimer = 0;
            }
        }

        // no path or finished path
        if (!ctrl.path || ctrl.targetIndex >= ctrl.path.length) {
            ctrl.idleTimer += delta;

            // Otherwise, wander check every 3s
            if (ctrl.idleTimer >= 3) {
                ctrl.idleTimer = 0;
                const roll = stingometer(1, 10);

                if (roll <= enemy.moveChance) {
                    const target = pickRandomPoint();
                    ctrl.path = findPath(grid, ref.current.position, target);
                    ctrl.targetIndex = 0;
                    ctrl.intent = "wander";
                }
            }
            return;
        }


        // no timer if moving
        ctrl.idleTimer = 0;

        const path = ctrl.path;
        const idx = ctrl.targetIndex;
        if (!path || idx >= path.length) return;

        const node = path[idx];
        const target = new THREE.Vector3(node.x, ref.current.position.y, node.z);
        const dir = target.clone().sub(ref.current.position);
        const dist = dir.length();

        if (dist < 0.05) {
            ctrl.targetIndex++;
            return;
        }

        dir.normalize();
        ref.current.position.add(dir.multiplyScalar(enemy.speed * delta));

        const targetAngle = Math.atan2(dir.x, dir.z);
        const deltaY = ((targetAngle - ref.current.rotation.y + Math.PI) % (2 * Math.PI)) - Math.PI;
        ref.current.rotation.y += deltaY * 0.1;
    };


    return { pickRandomPoint, updateEnemy };
};
