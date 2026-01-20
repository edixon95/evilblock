export const handleCreateLight = (prefab, intensity, height, position, length, rotation = 1) => {
    return {
        prefab,
        intensity,
        height,
        position,
        length,
        rotation
    }
}
