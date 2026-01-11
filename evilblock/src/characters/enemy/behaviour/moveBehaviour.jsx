import * as THREE from "three";

export const moveBehaviour = (ctx) => {
    const { ref, ctrl, enemy, delta } = ctx;
    if (!ref.current || !ctrl.path || ctrl.targetIndex >= ctrl.path.length) return;

    const enemyPos = ref.current.position;

    const node = ctrl.path[ctrl.targetIndex];
    const nodePos = new THREE.Vector3(node.x, enemyPos.y, node.z);

    const dir = nodePos.clone().sub(enemyPos);
    const distance = dir.length();

    const reachThreshold = 0.15;
    if (distance < reachThreshold) {
        ctrl.targetIndex++;
        return;
    }

    const moveDir = dir.clone().normalize();
    const speed = enemy.moveSpeed || 1;
    enemyPos.add(moveDir.multiplyScalar(speed * delta));

    const targetDir = moveDir.clone();

    targetDir.y = 0;
    if (targetDir.lengthSq() > 0) {
        targetDir.normalize();
        const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            targetDir
        );
        ref.current.quaternion.slerp(targetQuaternion, 0.1);
    }
};
