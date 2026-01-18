export const Chair1 = ({ prop, ref }) => {

    const rotationY =
        prop.rotation === 2
            ? Math.PI / 2
            : prop.rotation === 3
                ? Math.PI
                : prop.rotation === 4
                    ? (3 * Math.PI) / 2
                    : 0;

    return (
        <group position={[prop.position[0], 0.4, prop.position[1]]} rotation={[0, rotationY, 0]}>
            <mesh
                ref={ref}
                userData={prop.extra}
            >
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial color="white" wireframe visible={false} />
            </mesh>

            <mesh
                position={[0, -0.25, 0]}
            >
                <boxGeometry args={[0.8, 0.4, 0.8]} />
                <meshStandardMaterial color="white" />
            </mesh>

            <mesh
                position={[-0.325, 0.05, 0]}
            >
                <boxGeometry args={[0.15, 0.2, 0.8]} />
                <meshStandardMaterial color="white" />
            </mesh>

            <mesh
                position={[0.325, 0.05, 0]}
            >
                <boxGeometry args={[0.15, 0.2, 0.8]} />
                <meshStandardMaterial color="white" />
            </mesh>

            <mesh
                position={[0, 0.15, 0.325]}
            >
                <boxGeometry args={[0.8, 0.4, 0.15]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </group>
    );
}