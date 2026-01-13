import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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

        target.getWorldPosition(mesh.current.position);
        mesh.current.position.y += 1.2;

        mesh.current.lookAt(camera.position);

        const stability = player.aimStability || 0;
        const size = THREE.MathUtils.lerp(0.6, 0.12, stability);
        mesh.current.scale.setScalar(size);
    });

    return (
        <mesh ref={mesh} visible={false}>
            <ringGeometry args={[0.45, 0.5, 32]} />
            <meshBasicMaterial color="red" transparent opacity={0.8} />
        </mesh>
    );
};
