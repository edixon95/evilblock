import * as THREE from "three";

const direction = new THREE.Vector3();

export const movementBehaviour = ({ ctrl, input, ref, delta, canMove }) => {

    const rotationSpeed = 2;
    const speed = input.run && !input.back ? 3 : 2;
    const moveDistance = speed * delta;

    const rotationMultiplier = input.back ? -1 : 1;

    if (input.left) {
        ref.current.rotation.y += rotationSpeed * delta * rotationMultiplier;
    }

    if (input.right) {
        ref.current.rotation.y -= rotationSpeed * delta * rotationMultiplier;
    }

    if (!ctrl.aiming) {
        if (input.forward) {
            direction.set(0, 0, -1);
            if (canMove(ref.current.position, ref.current.rotation, direction, moveDistance)) {
                ref.current.translateZ(-moveDistance);
            }
        }

        if (input.back) {
            direction.set(0, 0, 1);
            if (canMove(ref.current.position, ref.current.rotation, direction, moveDistance)) {
                ref.current.translateZ(moveDistance);
            }
        }
    }
};
