import * as THREE from "three";
import { liveEnemyRefs } from "../../../managers/EnemyManager";
import { useEnemyStore } from "../../../stores/useEnemyStore";
import { useInventoryStore } from "../../../stores/useInventoryStore";

const raycaster = new THREE.Raycaster();
const directionVector = new THREE.Vector3();

export const shootingBehaviour = ({ ctrl, input, ref, weaponInfo, delta, location }) => {
    if (!ctrl.aiming) return;
    if (!weaponInfo) return;

    if (weaponInfo.fireCooldown === undefined) {
        weaponInfo.fireCooldown = 0;
    }

    weaponInfo.fireCooldown -= delta;
    if (weaponInfo.fireCooldown < 0) weaponInfo.fireCooldown = 0;

    if (!input.interact || weaponInfo.fireCooldown > 0) return;

    weaponInfo.fireCooldown = weaponInfo.fireDelay || 0.5;

    if (useInventoryStore.getState().getEquippedInformation()?.data?.currentAmmo === 0) {
        // todo sound
        console.log("no ammo");
        return;
    }

    useInventoryStore.getState().tryShootWeapon();

    const stability = ctrl.aimStability ?? 0;
    if (Math.random() > stability) {
        console.log("missed");
        ctrl.aimStability = Math.max(stability - weaponInfo.stabilityTime, stability * 0.5);
        return;
    }
    ctrl.aimStability = Math.max(stability - weaponInfo.stabilityTime, stability * 0.5);

    const target = getTargetEnemy(ref.current, weaponInfo);
    if (target) {
        useEnemyStore.getState().damageEnemy(target, weaponInfo.damage, location.level, location.room);
        console.log("Player shot enemy:", target);
    }
};

export const getTargetEnemy = (player, weaponInfo) => {
    if (!player) return false;

    const validEnemies = liveEnemyRefs.current
        .filter(r => r?.current)
        .map(r => r.current);
    if (validEnemies.length === 0) return false;

    const origin = player.position.clone();
    const forward = new THREE.Vector3(0, 0, -1).applyEuler(player.rotation).normalize();
    const CONE_ANGLE = (2 * Math.PI) / 3;
    const INTERACT_DISTANCE = weaponInfo.range;

    let nearestEnemy = null;
    let nearestDistance = Infinity;

    for (const enemy of validEnemies) {
        const dirToEnemy = enemy.position.clone().sub(origin).normalize();
        const angle = forward.angleTo(dirToEnemy);
        const distance = origin.distanceTo(enemy.position);

        if (angle <= CONE_ANGLE / 2 && distance <= INTERACT_DISTANCE && distance < nearestDistance) {
            nearestDistance = distance;
            nearestEnemy = enemy;
        }
    }

    return nearestEnemy || false;
};

