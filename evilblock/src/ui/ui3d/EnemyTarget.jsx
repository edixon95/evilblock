import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const _enemyPos = new THREE.Vector3();
const _toCamera = new THREE.Vector3();

export const EnemyTarget = ({ playerRef }) => {
    const mesh = useRef();
    const { camera } = useThree();

    useFrame(() => {
        const player = playerRef.current;
        if (!player || !mesh.current) return;

        const target = player.focusedEnemy;
        if (!target) {
            mesh.current.visible = false;
            return;
        }

        mesh.current.visible = true;

        target.getWorldPosition(_enemyPos);

        _toCamera
            .subVectors(camera.position, _enemyPos)
            .normalize();

        const CAMERA_PUSH = 0.4;
        const HEIGHT_OFFSET = 0.3;

        _enemyPos.addScaledVector(_toCamera, CAMERA_PUSH);
        _enemyPos.y += HEIGHT_OFFSET;

        mesh.current.position.copy(_enemyPos);

        mesh.current.lookAt(camera.position);

        const stability = player.aimStability || 0;
        const stabilitySize = THREE.MathUtils.lerp(0.6, 0.12, stability);

        const distance = camera.position.distanceTo(mesh.current.position);
        const screenSpaceScale = distance * 0.25; // tweak once, then forget

        mesh.current.scale.setScalar(stabilitySize * screenSpaceScale);
    });

    return (
        <mesh ref={mesh} visible={false}>
            <ringGeometry args={[0.45, 0.5, 32]} />
            <meshBasicMaterial
                color="red"
                transparent
                opacity={0.8}
                depthWrite={false}
            />
        </mesh>
    );
};
