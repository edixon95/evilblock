export const getSpawnPosition = (door) => {
    const { position, direction, type, size, stairDirection } = door;
    const [x, , z] = position;
    const y = 0.5;

    if (type === "DOOR") {
        const os = 0.75
        switch (direction) {
            case 1: return [x, y, z - os];
            case 3: return [x, y, z + os];
            case 2: return [x - os, y, z];
            case 4: return [x + os, y, z];
            default: return [x, y, z];
        }
    }

    if (type === "STAIR") {
        const os = stairDirection === "UP" ? 0 : 3
        const [width, , depth] = size;

        const offsetSign = stairDirection === "UP" ? -1 : 1;

        switch (direction) {
            case 1:
                return [
                    x + offsetSign * (width / 2 + os),
                    y,
                    z + depth / 3
                ];
            case 2:
                return [
                    x + depth / 3,
                    y,
                    z - offsetSign * (width / 2 + os)
                ];
            case 3:
                return [
                    x - offsetSign * (width / 2 + os),
                    y,
                    z - depth / 3
                ];
            case 4:
                return [
                    x - depth / 3,
                    y,
                    z + offsetSign * (width / 2 + os)
                ];
            default:
                return [x, y, z];
        }

    }

    return [x, y, z];
};
