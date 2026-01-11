export const handleCombineFloor = (floors) => {
    if (!floors.length) return null;

    let minX = Infinity, minZ = Infinity, maxX = -Infinity, maxZ = -Infinity, y = 0;
    floors.forEach(f => {
        const [fx, fy, fz] = f.position;
        const [fw, fd] = f.size;
        y = fy;
        minX = Math.min(minX, fx - fw / 2);
        maxX = Math.max(maxX, fx + fw / 2);
        minZ = Math.min(minZ, fz - fd / 2);
        maxZ = Math.max(maxZ, fz + fd / 2);
    });

    return {
        position: [(minX + maxX) / 2, y, (minZ + maxZ) / 2],
        size: [maxX - minX, maxZ - minZ],
    };
};