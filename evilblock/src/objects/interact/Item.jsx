export const Item = ({ ref, key, item }) => {

    if (item.data.isCollected) return;

    return (
        <mesh
            key={key}
            ref={ref}
            position={item.position}
            castShadow
            userData={item.data}
        >
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
}