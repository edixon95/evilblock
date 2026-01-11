export const canSeePlayerAngle = (enemyPos, enemyForward, playerPos, visionCone, visionDistance, seesPlayer) => {
    const toPlayer = playerPos.clone().sub(enemyPos);
    const distance = toPlayer.length();

    if (distance > visionDistance) return false;
    if (seesPlayer) return true;

    toPlayer.normalize();

    const dot = enemyForward.dot(toPlayer);

    const halfConeRad = (visionCone * Math.PI / 180) / 2;
    const minDot = Math.cos(halfConeRad);

    return dot >= minDot;
};
