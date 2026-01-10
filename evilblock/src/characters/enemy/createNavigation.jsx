import * as THREE from "three";
import { createGrid, findPath } from "./pathfinding";

export const createNavigation = (floors, blockableMeshes = []) => {
    if (!floors?.length) return { pickRandomPoint: () => new THREE.Vector3(0, 0.5, 0), updateEnemy: () => { } };

    const combinedFloor = floors[0]; // can expand if needed
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
        if (!enemy.controller) enemy.controller = { path: null, targetIndex: 0 };
        const ctrl = enemy.controller;

        if (!ctrl.path || ctrl.targetIndex >= ctrl.path.length) {
            const target = pickRandomPoint();
            ctrl.path = findPath(grid, ref.current.position, target);
            ctrl.targetIndex = 0;
        }

        const path = ctrl.path;
        const idx = ctrl.targetIndex;
        if (!path || idx >= path.length) return;

        const node = path[idx];
        const target = new THREE.Vector3(node.x, ref.current.position.y, node.z);
        const dir = target.clone().sub(ref.current.position);
        const dist = dir.length();

        if (dist < 0.05) ctrl.targetIndex++;
        else {
            dir.normalize();
            ref.current.position.add(dir.multiplyScalar(enemy.speed * delta));

            const targetAngle = Math.atan2(dir.x, dir.z);
            const deltaY = ((targetAngle - ref.current.rotation.y + Math.PI) % (2 * Math.PI)) - Math.PI;
            ref.current.rotation.y += deltaY * 0.1;
        }
    };

    return { pickRandomPoint, updateEnemy };
};
