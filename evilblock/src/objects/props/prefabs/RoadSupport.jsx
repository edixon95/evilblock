export const RoadSupport = ({ prop, ref }) => {

    const rotationY =
        prop.rotation === 2
            ? Math.PI / 2
            : prop.rotation === 3
                ? Math.PI
                : prop.rotation === 4
                    ? (3 * Math.PI) / 2
                    : 0;

    return (
        <group position={[prop.position[0], 2.5, prop.position[1]]} rotation={[0, rotationY, 0]}>
            <mesh
                ref={ref}
                userData={prop.extra}
            >
                <boxGeometry args={[1.5, 5, 1.5]} />
                <meshStandardMaterial color="white" wireframe visible={true} />
            </mesh>

            <mesh
                position={[0, 0, 0]}
            >
                <boxGeometry args={[1.5, 5, 1.5]} />
                <meshStandardMaterial color="white" />
            </mesh>


        </group>
    );
}