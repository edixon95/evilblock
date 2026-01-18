export const Tent1 = ({ prop, ref }) => {
    const rotationY =
        prop.rotation === 2
            ? Math.PI / 2
            : prop.rotation === 3
                ? Math.PI
                : prop.rotation === 4
                    ? (3 * Math.PI) / 2
                    : 0;

    return (
        <group
            position={[prop.position[0], 0.55, prop.position[1]]}
            rotation={[0, rotationY, 0]}
        >
            <mesh ref={ref} userData={prop.extra}>
                <boxGeometry args={[1.6, 1.2, 2]} />
                <meshStandardMaterial visible={false} wireframe />
            </mesh>

            <mesh
                position={[-0.325, 0, 0]}
                rotation={[0, 0, -Math.PI / 6]}
            >
                <boxGeometry args={[0.05, 1.2, 2]} />
                <meshStandardMaterial color="white" />
            </mesh>

            <mesh
                position={[0.325, 0, 0]}
                rotation={[0, 0, Math.PI / 6]}
            >
                <boxGeometry args={[0.05, 1.2, 2]} />
                <meshStandardMaterial color="white" />
            </mesh>

            <mesh
                position={[0, 0, 0.9]}
            >
                <boxGeometry args={[0.08, 1, 0.08]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </group>
    );
};
