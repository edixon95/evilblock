import * as THREE from "three";

export const createNavigation = (floors = [], blockableMeshes = []) => {
    const raycaster = new THREE.Raycaster();

    const pickRandomPoint = () => {
        if (!floors?.length === 0 && !blockableMeshes?.length === 0) return new THREE.Vector3(0, 0.5, 0);


        let maxAttempts = 20;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const floor = floors[Math.floor(Math.random() * floors.length)];
            const [fx, fy, fz] = floor.position;
            const [fw, fd] = floor.size;

            const x = fx - fw / 2 + Math.random() * fw;
            const z = fz - fd / 2 + Math.random() * fd;
            const yStart = fy + 5;

            const origin = new THREE.Vector3(x, yStart, z);
            const dir = new THREE.Vector3(0, -1, 0);

            raycaster.set(origin, dir);
            const hits = raycaster.intersectObjects(blockableMeshes, true);

            // If nothing blocks, use floor height
            const y = hits.length ? hits[0].point.y + 0.5 : fy + 0.5;

            const position = new THREE.Vector3(x, y, z);

            // buffer
            const tooClose = blockableMeshes.some(o => {
                const pos = new THREE.Vector3();
                o.getWorldPosition(pos);
                return pos.distanceTo(position) < 0.5;
            });
            if (!tooClose) return position;
        }

        // fallback if nothing valid
        const [fx, fy, fz] = floors[0].position;
        return new THREE.Vector3(fx, fy + 0.5, fz);
    };

    const findPath = (from, to) => {
        const direction = new THREE.Vector3().subVectors(to, from);
        const dist = direction.length();
        direction.normalize();

        const ray = new THREE.Raycaster(from.clone().add(new THREE.Vector3(0, 0.5, 0)), direction, 0, dist);
        const hits = ray.intersectObjects(blockableMeshes, true);

        if (hits.length === 0) {
            return [{ x: to.x, z: to.z }];
        }

        const mid = from.clone().lerp(to, 0.5);
        return [{ x: mid.x, z: mid.z }, { x: to.x, z: to.z }];
    };

    return { pickRandomPoint, findPath };
};
