import * as THREE from "three";

const _debugVectors = {
    forward: new THREE.Vector3(),
    left: new THREE.Vector3(),
    right: new THREE.Vector3(),
};

const drawLine = (() => {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial();

    return (scene, start, end, color) => {
        geometry.setFromPoints([start, end]);
        material.color.setHex(color);

        const line = new THREE.Line(geometry.clone(), material.clone());
        scene.add(line);

        // auto-remove after one frame
        setTimeout(() => scene.remove(line), 0);
    };
})();


export const drawVisionConeDebug = (enemy, ref, scene) => {
    const debug = true;
    if (!debug || !ref.current) return;

    const origin = ref.current.position;
    const distance = enemy.visionDistance;

    if (enemy.seesPlayer) {
        const steps = 24;
        for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            const dir = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
            const end = origin.clone().add(dir.multiplyScalar(distance));
            drawLine(scene, origin, end, 0xff00ff);
        }
    } else {
        ref.current.getWorldDirection(_debugVectors.forward);

        const halfAngle = (enemy.visionCone * Math.PI / 180) / 2;

        _debugVectors.left
            .copy(_debugVectors.forward)
            .applyAxisAngle(new THREE.Vector3(0, 1, 0), halfAngle)
            .multiplyScalar(distance)
            .add(origin);

        _debugVectors.right
            .copy(_debugVectors.forward)
            .applyAxisAngle(new THREE.Vector3(0, 1, 0), -halfAngle)
            .multiplyScalar(distance)
            .add(origin);

        const forwardEnd = _debugVectors.forward.clone().multiplyScalar(distance).add(origin);

        drawLine(scene, origin, forwardEnd, 0xffff00);
        drawLine(scene, origin, _debugVectors.left, 0xff0000);
        drawLine(scene, origin, _debugVectors.right, 0x00ff00);
    }
};