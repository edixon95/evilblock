export const Prop = ({ prop, ref }) => {
    return (
        <mesh
            ref={ref}
            position={prop.position}
            castShadow
            receiveShadow
        >
            <boxGeometry args={prop.size} />
            <meshStandardMaterial color="green" />
        </mesh>
    );
}