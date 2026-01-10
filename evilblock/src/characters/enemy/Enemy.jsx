export const Enemy = ({ enemy, ref }) => {
    return (
        <mesh
            key={enemy.id}
            ref={ref}
            position={[3, 0.5, 3]}
            userData={{ enemyId: "stuff" }}
            castShadow
        >
            <boxGeometry args={[0.5, 1, 0.5]} />
            <meshStandardMaterial color="cyan" />
        </mesh>
    )
}