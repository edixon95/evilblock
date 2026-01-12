import * as THREE from "three";
import { liveEnemyRefs } from "../../../managers/EnemyManager";
import { useEnemyStore } from "../../../stores/useEnemyStore";

const raycaster = new THREE.Raycaster();
const directionVector = new THREE.Vector3();

export const shootingBehaviour = ({ ctrl, input, ref, weaponInfo, delta, location }) => {
    if (!ctrl.aiming) return;
    if (!weaponInfo) return;

    // initialize cooldown
    if (weaponInfo.fireCooldown === undefined) {
        weaponInfo.fireCooldown = 0;
    }

    // reduce cooldown
    weaponInfo.fireCooldown -= delta;
    if (weaponInfo.fireCooldown < 0) weaponInfo.fireCooldown = 0;

    if (!input.interact || weaponInfo.fireCooldown > 0) return;

    const target = getTargetEnemy(ref.current, weaponInfo);
    if (target) {
        // TODO: make hurt
        // TODO: GET REAL GUN DATA FROM EQUIPPED
        useEnemyStore.getState().damageEnemy(target, 5, location.level, location.room)
        console.log("Player shot enemy:", target);
    }

    weaponInfo.fireCooldown = weaponInfo.fireDelay || 0.5;
};

export const getTargetEnemy = (player, weaponInfo) => {
    if (!player) return false;

    const validEnemies = liveEnemyRefs.current.filter(r => r?.current).map(r => r.current);
    if (validEnemies.length === 0) return false;

    const origin = player.position.clone();
    const CONE_ANGLE = (2 * Math.PI) / 3;
    const INTERACT_DISTANCE = weaponInfo.range;

    let nearestEnemy = null;
    let nearestDistance = Infinity;

    const steps = 5;

    for (let i = -Math.floor(steps / 2); i <= Math.floor(steps / 2); i++) {
        const angleOffset = (i / steps) * CONE_ANGLE;

        directionVector.set(0, 0, -1)
            .applyEuler(player.rotation)
            .normalize();
        directionVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleOffset);

        raycaster.set(origin, directionVector.clone());
        raycaster.far = INTERACT_DISTANCE;

        const hits = raycaster.intersectObjects(validEnemies, false);
        if (hits.length > 0 && hits[0].distance < nearestDistance) {
            nearestDistance = hits[0].distance;
            nearestEnemy = hits[0].object;
        }
    }

    return nearestEnemy || false;
};
