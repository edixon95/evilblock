import * as THREE from "three";

export const createEnemyControllerState = () => ({
    path: null,
    targetIndex: 0,
});

export const updateEnemy = (enemy, ref, navigation, delta) => {
    if (!ref.current) return;

    // Attach controller lazily
    if (!enemy.controller) {
        enemy.controller = createEnemyControllerState();
    }

    const controller = enemy.controller;

    // No path? Get one
    if (!controller.path) {
        const target = navigation.pickRandomPoint();
        controller.path = navigation.findPath(
            ref.current.position,
            target
        );
        controller.targetIndex = 0;
    }

    const path = controller.path;
    const idx = controller.targetIndex;

    if (!path || idx >= path.length) {
        controller.path = null;
        return;
    }

    const node = path[idx];
    const target = new THREE.Vector3(
        node.x,
        ref.current.position.y,
        node.z
    );

    const dir = target.clone().sub(ref.current.position);
    const dist = dir.length();

    if (dist < 0.05) {
        controller.targetIndex++;
        return;
    }
    dir.normalize();
    ref.current.position.add(
        dir.multiplyScalar(enemy.speed * delta)
    );
};
