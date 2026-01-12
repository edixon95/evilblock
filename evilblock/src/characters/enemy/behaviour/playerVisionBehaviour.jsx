import * as THREE from "three";
import { hasLineOfSight } from "../../../helpers/hasLineOfSight";
import { canSeePlayerAngle } from "../actions/canSeePlayerAngle";

export const playerVisionBehaviour = (ctx) => {
    const { enemy, ref, ctrl, playerRef, blockableMeshes } = ctx;
    if (!playerRef?.current) {
        enemy.seesPlayer = false;
        return;
    }

    const enemyPos = ref.current.position;
    const playerPos = playerRef.current.position;

    const enemyForward = new THREE.Vector3();
    ref.current.getWorldDirection(enemyForward);

    const inCone = canSeePlayerAngle(
        enemyPos,
        enemyForward,
        playerPos,
        enemy.visionCone,
        enemy.visionDistance,
        enemy.seesPlayer
    );

    if (!inCone) {
        enemy.seesPlayer = false;
        return;
    }

    if (!hasLineOfSight(enemyPos, playerPos, blockableMeshes)) {
        enemy.seesPlayer = false;
        return;
    }

    ctrl.intent = "player";
    enemy.seesPlayer = true;
};
