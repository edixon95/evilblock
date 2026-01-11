import * as THREE from "three";

const raycaster = new THREE.Raycaster();

export const hasLineOfSight = (enemyPos, playerPos, blockableMeshes) => {
    const direction = playerPos.clone().sub(enemyPos).normalize();
    const distance = enemyPos.distanceTo(playerPos);

    raycaster.set(enemyPos, direction);
    raycaster.far = distance;

    const hits = raycaster.intersectObjects(blockableMeshes, true);
    return hits.length === 0;
};
