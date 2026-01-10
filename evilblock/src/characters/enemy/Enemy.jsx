import { forwardRef } from "react";

export const Enemy = forwardRef(({ enemy }, ref) => {
    return (
        <mesh
            ref={ref}
            userData={{ enemyId: enemy.id }}
            castShadow
        >
            <boxGeometry args={[0.5, 1, 0.5]} />
            <meshStandardMaterial color="cyan" />
        </mesh>
    );
});
