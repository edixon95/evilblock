export const countWallSegments = (floors) => {
    let refCount = 0;

    const checkOverlap = (start, end, otherStart, otherEnd) =>
        Math.max(start, otherStart) < Math.min(end, otherEnd);

    floors.forEach((floor, idx) => {
        const [fx, , fz] = floor.position;
        const [fw, fd] = floor.size;

        // ---------- LEFT WALL ----------
        let leftSplits = [[fz - fd / 2, fz + fd / 2]];

        floors.forEach((other, j) => {
            if (j === idx) return;

            const [ox, , oz] = other.position;
            const [ow, od] = other.size;
            const otherXRange = [ox - ow / 2, ox + ow / 2];

            const xCoord = fx - fw / 2;

            if (xCoord <= otherXRange[1] && xCoord >= otherXRange[0]) {
                leftSplits = leftSplits.flatMap(([s, e]) => {
                    const otherZRange = [oz - od / 2, oz + od / 2];
                    if (!checkOverlap(s, e, ...otherZRange)) return [[s, e]];

                    const segs = [];
                    if (s < otherZRange[0]) segs.push([s, otherZRange[0]]);
                    if (e > otherZRange[1]) segs.push([otherZRange[1], e]);
                    return segs;
                });
            }
        });

        leftSplits.forEach(([s, e]) => {
            if (e - s > 0.01) {
                refCount++;
            }
        });

        // ---------- RIGHT WALL ----------
        let rightSplits = [[fz - fd / 2, fz + fd / 2]];

        floors.forEach((other, j) => {
            if (j === idx) return;

            const [ox, , oz] = other.position;
            const [ow, od] = other.size;
            const otherXRange = [ox - ow / 2, ox + ow / 2];

            const xCoord = fx + fw / 2;

            if (xCoord <= otherXRange[1] && xCoord >= otherXRange[0]) {
                rightSplits = rightSplits.flatMap(([s, e]) => {
                    const otherZRange = [oz - od / 2, oz + od / 2];
                    if (!checkOverlap(s, e, ...otherZRange)) return [[s, e]];

                    const segs = [];
                    if (s < otherZRange[0]) segs.push([s, otherZRange[0]]);
                    if (e > otherZRange[1]) segs.push([otherZRange[1], e]);
                    return segs;
                });
            }
        });

        rightSplits.forEach(([s, e]) => {
            if (e - s > 0.01) {
                refCount++;
            }
        });

        // ---------- TOP WALL ----------
        let topSplits = [[fx - fw / 2, fx + fw / 2]];

        floors.forEach((other, j) => {
            if (j === idx) return;

            const [ox, , oz] = other.position;
            const [ow, od] = other.size;
            const otherZRange = [oz - od / 2, oz + od / 2];

            const zCoord = fz + fd / 2;

            if (zCoord <= otherZRange[1] && zCoord >= otherZRange[0]) {
                topSplits = topSplits.flatMap(([s, e]) => {
                    const otherXRange = [ox - ow / 2, ox + ow / 2];
                    if (!checkOverlap(s, e, ...otherXRange)) return [[s, e]];

                    const segs = [];
                    if (s < otherXRange[0]) segs.push([s, otherXRange[0]]);
                    if (e > otherXRange[1]) segs.push([otherXRange[1], e]);
                    return segs;
                });
            }
        });

        topSplits.forEach(([s, e]) => {
            if (e - s > 0.01) {
                refCount++;
            }
        });

        // ---------- BOTTOM WALL ----------
        let bottomSplits = [[fx - fw / 2, fx + fw / 2]];

        floors.forEach((other, j) => {
            if (j === idx) return;

            const [ox, , oz] = other.position;
            const [ow, od] = other.size;
            const otherZRange = [oz - od / 2, oz + od / 2];

            const zCoord = fz - fd / 2;

            if (zCoord <= otherZRange[1] && zCoord >= otherZRange[0]) {
                bottomSplits = bottomSplits.flatMap(([s, e]) => {
                    const otherXRange = [ox - ow / 2, ox + ow / 2];
                    if (!checkOverlap(s, e, ...otherXRange)) return [[s, e]];

                    const segs = [];
                    if (s < otherXRange[0]) segs.push([s, otherXRange[0]]);
                    if (e > otherXRange[1]) segs.push([otherXRange[1], e]);
                    return segs;
                });
            }
        });

        bottomSplits.forEach(([s, e]) => {
            if (e - s > 0.01) {
                refCount++;
            }
        });
    });

    return refCount;
};
