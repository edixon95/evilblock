import { forwardRef, useRef } from "react";

export const Enemy = forwardRef(({ enemy }, ref) => {
    const upperRef = useRef();
    const lowerRef = useRef();

    return (
        <mesh
            ref={ref}
            userData={{ enemyId: enemy.id }}
            castShadow
        >
            {/* COLLISION ONLY */}
            <boxGeometry args={[0.5, 1.0, 0.5]} />
            <meshBasicMaterial wireframe={true} />

            {/* VISUALS */}
            <group>
                {/* Lower visual */}
                <mesh ref={lowerRef} position={[0, -0.175, 0]}>
                    <boxGeometry args={[0.35, 0.65, 0.35]} />
                    <meshStandardMaterial color="cyan" />
                </mesh>

                {/* Upper visual (animated) */}
                <mesh
                    ref={upperRef}
                    position={[0, 0.35, 0.2]}
                    rotation={[Math.PI / 4, 0, 0]}
                >
                    <boxGeometry args={[0.35, 0.35, 0.35]} />
                    <meshStandardMaterial color="cyan" />
                </mesh>
            </group>
        </mesh>
    );
});
