export const findPath = (gridData, startPos, endPos) => {
    const { grid, origin, tileSize } = gridData;

    const toGrid = (v) => ({
        x: Math.floor((v.x - origin.x) / tileSize),
        z: Math.floor((v.z - origin.z) / tileSize),
    });

    const toWorld = (g) => ({
        x: origin.x + g.x * tileSize + tileSize / 2,
        z: origin.z + g.z * tileSize + tileSize / 2,
    });

    const start = toGrid(startPos);
    const end = toGrid(endPos);

    const w = grid.length;
    const h = grid[0].length;

    const open = [];
    const closed = new Set();
    const cameFrom = {};

    const hash = (node) => `${node.x},${node.z}`;

    const heuristic = (a, b) =>
        Math.abs(a.x - b.x) + Math.abs(a.z - b.z);

    open.push({ ...start, g: 0, f: heuristic(start, end) });

    while (open.length) {
        // lowest f
        open.sort((a, b) => a.f - b.f);
        const current = open.shift();
        if (current.x === end.x && current.z === end.z) {
            // Reconstruct path
            const path = [];
            let c = hash(current);
            while (cameFrom[c]) {
                path.unshift(toWorld(current));
                current.x = cameFrom[c].x;
                current.z = cameFrom[c].z;
                c = hash(current);
            }
            path.unshift(toWorld(start));
            return path;
        }

        closed.add(hash(current));

        const neighbors = [
            { x: current.x + 1, z: current.z },
            { x: current.x - 1, z: current.z },
            { x: current.x, z: current.z + 1 },
            { x: current.x, z: current.z - 1 },
        ];

        for (const n of neighbors) {
            if (
                n.x < 0 || n.x >= w || n.z < 0 || n.z >= h ||
                grid[n.x][n.z] === 1 ||
                closed.has(hash(n))
            ) continue;

            const g = current.g + 1;
            const f = g + heuristic(n, end);

            const existing = open.find(o => o.x === n.x && o.z === n.z);
            if (existing) {
                if (g < existing.g) {
                    existing.g = g;
                    existing.f = f;
                    cameFrom[hash(n)] = { x: current.x, z: current.z };
                }
            } else {
                open.push({ x: n.x, z: n.z, g, f });
                cameFrom[hash(n)] = { x: current.x, z: current.z };
            }
        }
    }

    return []; // no path found
};
