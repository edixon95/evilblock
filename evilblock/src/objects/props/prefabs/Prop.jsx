export const Prop = ({ prop, ref }) => {
    return (
        <mesh
            ref={ref}
            position={prop.position}
            castShadow
            receiveShadow
            userData={prop.extra}
        >
            <boxGeometry args={prop.size} />
            <meshStandardMaterial color="green" />
        </mesh>
    );
}