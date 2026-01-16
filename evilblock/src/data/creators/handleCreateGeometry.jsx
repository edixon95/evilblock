export const handleCreateGeometry = (position = [4, 0, 0], size = [10, 4], skip = false, direction = 1) => {
    return {
        position, size, color: "#999", skip, direction
    }
}