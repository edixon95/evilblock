import * as THREE from "three";

export const stabilityBehaviour = ({ ctrl, ref, delta, input, weaponInfo }) => {
    if (!ctrl.aiming) {
        ctrl.aimStability = 0;
        return;
    }

    if (!ctrl.lastRotation) {
        ctrl.lastRotation = ref.current.rotation.clone();
    }

    const rot = ref.current.rotation;
    const rotDelta =
        Math.abs(rot.y - ctrl.lastRotation.y) +
        Math.abs(rot.x - ctrl.lastRotation.x);

    ctrl.lastRotation.copy(rot);

    const moving = input.left || input.right;

    const buildRate = 1 / (weaponInfo.stabilityTime || 0.5);

    ctrl.aimStability ??= 0;
    ctrl.aimStability += delta * buildRate;
    ctrl.aimStability -= rotDelta * 2.5;
    if (moving) ctrl.aimStability -= delta * 2.0;

    ctrl.aimStability = THREE.MathUtils.clamp(ctrl.aimStability, 0, 1);
};
