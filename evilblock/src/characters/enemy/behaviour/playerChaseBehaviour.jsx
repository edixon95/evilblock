import * as THREE from "three";
import { findPath } from "../pathfinding";

export const playerChaseBehaviour = (ctx) => {
    const { enemy, ref, ctrl, grid, playerRef, delta } = ctx;
    if (!playerRef?.current) return;

    if (ctrl.intent !== "player") return;

    const enemyPos = ref.current.position.clone();
    const playerPos = playerRef.current.position.clone();

    if (ctrl.chaseTimer === undefined) ctrl.chaseTimer = 0;
    if (ctrl.lostPlayerTimer === undefined) ctrl.lostPlayerTimer = 0;

    const distance = enemyPos.distanceTo(playerPos);
    const stopDistance = 0.6;

    if (distance <= stopDistance + 0.5) {
        ctrl.intent = "attacking";
        ctrl.path = null;
        ctrl.targetIndex = 0;
        return;
    }

    if (!enemy.seesPlayer) {
        ctrl.lostPlayerTimer += delta;
        const lostTime = 7;
        if (ctrl.lostPlayerTimer >= lostTime) {
            ctrl.intent = "idle";
            ctrl.path = null;
            ctrl.targetIndex = 0;
            ctrl.lostPlayerTimer = 0;
            return;
        }
    } else {
        ctrl.lostPlayerTimer = 0;
    }


    ctrl.chaseTimer += delta;

    const dir = playerPos.clone().sub(enemyPos).normalize();

    const targetPos = playerPos.clone().sub(dir.multiplyScalar(stopDistance));

    const recalcDistance = 0.5;
    const playerMoved =
        !ctrl.lastPlayerTargetPos ||
        ctrl.lastPlayerTargetPos.distanceToSquared(targetPos) > recalcDistance * recalcDistance;

    const nearEndOfPath = !ctrl.path || ctrl.targetIndex >= (ctrl.path.length - 2);
    const recalcTime = 1.0;

    if ((playerMoved || (ctrl.chaseTimer >= recalcTime && nearEndOfPath)) && distance > stopDistance) {
        ctrl.path = findPath(grid, enemyPos, targetPos);
        ctrl.targetIndex = 0;
        ctrl.chaseTimer = 0;
        ctrl.lastPlayerTargetPos = targetPos.clone();
    }
};
