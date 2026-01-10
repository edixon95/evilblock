import * as THREE from "three";

export const createNavigation = (floors) => {
    return {
        pickRandomPoint() {
            if (!floors.length) {
                return new THREE.Vector3(0, 0.5, 0);
            }

            const floor = floors[Math.floor(Math.random() * floors.length)];
            const [x, y, z] = floor.position;
            const [w, d] = floor.size;

            return new THREE.Vector3(
                x - w / 2 + Math.random() * w,
                y + 0.5,
                z - d / 2 + Math.random() * d
            );
        },

        findPath(from, to) {
            // TEMP: straight line
            return [{ x: to.x, z: to.z }];
        },
    };
};
