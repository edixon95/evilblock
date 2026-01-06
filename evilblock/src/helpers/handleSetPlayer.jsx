export const handleSetPlayerPosition = (playerRef, position) => {
    playerRef.current.position.set(
        position[0],
        position[1],
        position[2]
    );
}

export const handleSetPlayerRotation = (playerRef, rotation, isDoor, reverse = false) => {
    let yRot
    if (!isDoor) {
        const directionToRotationY = {
            1: -Math.PI / 2,
            2: 0,
            3: Math.PI / 2,
            4: Math.PI,
        };

        yRot = directionToRotationY[rotation];

        if (reverse) {
            yRot += Math.PI;
            if (yRot > Math.PI) yRot -= 2 * Math.PI;
        }
    } else {
        const directionToRotationY = {
            1: 0,
            2: Math.PI / 2,
            3: Math.PI,
            4: -Math.PI / 2,
        }

        yRot = directionToRotationY[rotation];

    }
    playerRef.current.rotation.set(0, yRot, 0);
}
