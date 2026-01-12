export const attackBehaviour = (ctx) => {
    const { enemy, ctrl, playerRef, delta } = ctx;
    if (!playerRef?.current) return;
    if (ctrl.intent !== "attacking") return;

    // initialize attack timer
    if (ctrl.attackTimer === undefined) ctrl.attackTimer = 0;
    const attackCooldown = 1.0; // seconds between attacks

    ctrl.attackTimer += delta;

    if (ctrl.attackTimer >= attackCooldown) {
        // perform attack
        console.log(`Enemy ${enemy.id} attacks the player!`);

        // TODO: apply damage or trigger player hit function
        // if (playerRef.current.takeDamage) {
        //     playerRef.current.takeDamage(enemy.attackPower ?? 1);
        // }

        ctrl.attackTimer = 0;
    }
};
