export const WorldSpotlight = ({
    color = "#ffffff",
    intensity = 1,
    position = [0, 0, 0],
    angle = 1,
    penumbra = 0.5
}) => {
    return (
        <spotLight
            color={color}
            intensity={intensity}
            position={position}
            angle={angle}
            penumbra={penumbra}
        />
    )
}