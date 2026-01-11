import * as THREE from "three";

export const moveBehaviour = (ctx) => {
    const { enemy, ref, ctrl, delta } = ctx;

    if (!ctrl.path || ctrl.targetIndex >= ctrl.path.length) return false;

    const node = ctrl.path[ctrl.targetIndex];
    const target = new THREE.Vector3(
        node.x,
        ref.current.position.y,
        node.z
    );

    const dir = target.clone().sub(ref.current.position);
    const dist = dir.length();

    if (dist < 0.05) {
        ctrl.targetIndex++;
        return true;
    }

    dir.normalize();
    ref.current.position.add(
        dir.multiplyScalar(enemy.speed * delta)
    );

    const targetAngle = Math.atan2(dir.x, dir.z);
    const deltaY =
        ((targetAngle - ref.current.rotation.y + Math.PI) %
            (2 * Math.PI)) -
        Math.PI;

    ref.current.rotation.y += deltaY * 0.1;

    return true;
};
