import * as THREE from "three";

export const createEnemyControllerState = () => ({
    path: null,
    targetIndex: 0,
});

export const updateEnemy = (enemy, ref, navigation, delta) => {
    if (!ref.current) return;

    if (!enemy.controller) enemy.controller = { path: null, targetIndex: 0 };
    const controller = enemy.controller;

    // Pick new target if no path
    if (!controller.path || controller.targetIndex >= controller.path.length) {
        const target = navigation.pickRandomPoint();
        controller.path = navigation.findPath(ref.current.position, target);
        controller.targetIndex = 0;
    }

    const path = controller.path;
    const idx = controller.targetIndex;
    if (!path || idx >= path.length) return;

    const node = path[idx];
    const target = new THREE.Vector3(node.x, ref.current.position.y, node.z);

    const dir = target.clone().sub(ref.current.position);
    const dist = dir.length();
    if (dist < 0.05) {
        controller.targetIndex++;
        return;
    }

    dir.normalize();

    // --- Raycast safety check ---
    const raycaster = new THREE.Raycaster(ref.current.position.clone(), dir, 0, enemy.speed * delta);
    const hits = raycaster.intersectObjects(navigation.blockableMeshes ?? [], true);
    if (hits.length > 0) {
        // collision detected, stop or pick new target
        controller.path = null;
        return;
    }

    // Move enemy
    ref.current.position.add(dir.multiplyScalar(enemy.speed * delta));

    const targetAngle = Math.atan2(dir.x, dir.z);
    let deltaY = ((targetAngle - ref.current.rotation.y + Math.PI) % (2 * Math.PI)) - Math.PI;
    ref.current.rotation.y += deltaY * 0.1;
};

