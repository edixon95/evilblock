export const WorldRectLight = ({
    color = "#00ffff",
    intensity = 5,
    position = [0, 0, 0],
    width = 2,
    height = 0.5,
    rotation = [0, 0, 0],
}) => {
    return (
        <rectAreaLight
            color={color}
            intensity={intensity}
            position={position}
            width={width}
            height={height}
            rotation={rotation}
        />
    )
}
