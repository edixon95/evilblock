import { Box3 } from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../stores/useGameStore";

export const RegionTrigger = ({
    playerRef,
    id,
    position,
    size,
}) => {
    const isVisible = true;
    const boxRef = useRef();
    const box = useMemo(() => new Box3(), []);

    useFrame(() => {
        if (!playerRef?.current || !boxRef.current) return;

        box.setFromObject(boxRef.current);

        if (box.containsPoint(playerRef.current.position)) {
            useGameStore.getState().handleChangeRegion(id)
        }
    });

    return (
        <mesh ref={boxRef} position={position} visible={true}>
            <boxGeometry args={size} />
            <meshBasicMaterial wireframe visible={isVisible} />
        </mesh>
    );
}