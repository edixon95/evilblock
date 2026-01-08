export const Door = ({ door, ref }) => {
    const rotationY =
        door.direction === 2
            ? Math.PI / 2
            : door.direction === 3
                ? Math.PI
                : door.direction === 4
                    ? (3 * Math.PI) / 2
                    : 0;
    return (
        <mesh
            ref={ref}
            position={door.position}
            rotation={[0, rotationY, 0]}
            userData={{
                type: "DOOR",
                door,
            }}
        >
            <boxGeometry args={door.size} />
            <meshStandardMaterial color="yellow" />
        </mesh>
    );
};
