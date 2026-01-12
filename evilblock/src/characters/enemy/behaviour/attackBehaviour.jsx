import * as THREE from "three";

export const attackBehaviour = (ctx) => {
    const { enemy, ctrl, playerRef, ref, delta } = ctx;

    const upper = enemy._upperRef;
    if (!playerRef?.current || !upper) return;

    const defaultForwardRot = Math.PI / 4;
    const defaultForwardZ = 0.2;
    const windupBackRot = -Math.PI / 6;
    const windupBackZ = 0.0;
    const windupTime = 1.0;
    const attackTime = 0.3;
    const recoveryTime = 0.5;

    if (!ctrl.attackPhase) ctrl.attackPhase = "windup";
    if (ctrl.windupTimer === undefined) ctrl.windupTimer = 0;
    if (ctrl.hasAppliedDamage === undefined) ctrl.hasAppliedDamage = false;

    const enemyPos = ref.current.position;
    const playerPos = playerRef.current.position;
    const distance = enemyPos.distanceTo(playerPos);
    const stopDistance = 0.6;

    if (distance > stopDistance + 0.5) {
        upper.rotation.x = THREE.MathUtils.lerp(
            upper.rotation.x,
            defaultForwardRot,
            delta * 5
        );
        upper.position.z = THREE.MathUtils.lerp(
            upper.position.z,
            defaultForwardZ,
            delta * 5
        );

        ctrl.attackPhase = "windup";
        ctrl.windupTimer = 0;
        ctrl.hasAppliedDamage = false;
        return;
    }

    ctrl.windupTimer += delta;

    if (ctrl.attackPhase === "windup") {
        const t = Math.min(ctrl.windupTimer / windupTime, 1);
        upper.rotation.x = THREE.MathUtils.lerp(defaultForwardRot, windupBackRot, t);
        upper.position.z = THREE.MathUtils.lerp(defaultForwardZ, windupBackZ, t);

        if (t >= 1) {
            ctrl.attackPhase = "attack";
            ctrl.windupTimer = 0;
        }
    }

    else if (ctrl.attackPhase === "attack") {
        const t = Math.min(ctrl.windupTimer / attackTime, 1);
        upper.rotation.x = THREE.MathUtils.lerp(windupBackRot, defaultForwardRot, t);
        upper.position.z = THREE.MathUtils.lerp(windupBackZ, defaultForwardZ, t);

        if (!ctrl.hasAppliedDamage && t >= 0.7) {
            console.log(`Enemy ${enemy.id} hits the player!`);
            ctrl.hasAppliedDamage = true;
        }

        if (t >= 1) {
            ctrl.attackPhase = "recovery";
            ctrl.windupTimer = 0;
        }
    }

    else if (ctrl.attackPhase === "recovery") {
        upper.rotation.x = THREE.MathUtils.lerp(
            upper.rotation.x,
            defaultForwardRot,
            delta * 5
        );
        upper.position.z = THREE.MathUtils.lerp(
            upper.position.z,
            defaultForwardZ,
            delta * 5
        );

        if (ctrl.windupTimer >= recoveryTime) {
            ctrl.attackPhase = "windup";
            ctrl.windupTimer = 0;
            ctrl.hasAppliedDamage = false;
        }
    }
};
