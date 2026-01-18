export const handleCreateLight = (
    color = "#ffffff",
    intensity = 1,
    position = [0, 0],
    height = null,
    angle = 1,
    penumbra = 0.5
) => {
    return {
        color,
        intensity,
        position: [position[0], height ?? 4.5, position[1]],
        angle,
        penumbra
    }
}