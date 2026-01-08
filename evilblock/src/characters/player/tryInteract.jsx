import * as THREE from "three";
import { doorMeshes } from "../../managers/DoorManager";
import { DOOR } from "../../constants/doorConstants";
import { handleUseDoor } from "./actions/handleUseDoor";
import { interactMeshes } from "../../managers/InteractManager";

const interactionRaycaster = new THREE.Raycaster();
const interactionDirection = new THREE.Vector3();

const CONE_ANGLE = (2 * Math.PI) / 3;
const INTERACT_DISTANCE = 1;
const DOOR_INTERACT_DISTANCE = 0.75
const PICKUP_RADIUS = 0.5;

const tryFindDoor = (player, origin) => {
    const doorDirection = new THREE.Vector3(0, 0, -1)
        .applyEuler(player.rotation)
        .normalize();

    const rayStart = origin.clone().add(doorDirection.clone().multiplyScalar(-0.1)); // <- behind by 0.1
    const rayDistance = DOOR_INTERACT_DISTANCE + 0.1; // extend a little to cover the extra start distance

    interactionRaycaster.set(rayStart, doorDirection);
    interactionRaycaster.far = rayDistance;

    const scene = player.parent;
    if (scene) {
        const doorHits = interactionRaycaster.intersectObjects(scene.children, true);
        for (const hit of doorHits) {
            if (hit.object.userData?.type === DOOR) {
                return hit.object.userData.door
            }
        }
    }
}

const tryFindOther = (player, origin) => {
    const meshes = [...interactMeshes]
        .map(ref => ref.current)
        .filter(Boolean);
    let hitItem = null;
    let nearestDistance = Infinity;

    const steps = 11;
    for (let i = -Math.floor(steps / 2); i <= Math.floor(steps / 2); i++) {
        const angleOffset = (i / steps) * CONE_ANGLE;

        interactionDirection.set(0, 0, -1)
            .applyEuler(player.rotation)
            .normalize();

        interactionDirection.y = Math.tan(angleOffset);

        interactionRaycaster.set(origin, interactionDirection.clone().normalize());
        interactionRaycaster.far = INTERACT_DISTANCE;

        const hits = interactionRaycaster.intersectObjects(meshes, false);
        if (hits.length > 0 && hits[0].distance < nearestDistance) {
            nearestDistance = hits[0].distance;
            hitItem = hits[0].object;
        }
    }
    if (hitItem)
        return hitItem

    // Fallback: check proximity sphere for pickup
    if (!hitItem) {
        const playerFeet = origin.clone();
        playerFeet.y -= 0.5;
        const sphere = new THREE.Sphere(playerFeet, PICKUP_RADIUS);

        for (const mesh of meshes) {
            const box = new THREE.Box3().setFromObject(mesh);
            if (box.intersectsSphere(sphere)) {
                return mesh
            }
        }
    }

    return false;
}

export const tryInteract = (player) => {
    if (!player) return

    const origin = player.position.clone();

    const door = tryFindDoor(player, origin)
    if (door) {
        handleUseDoor(door)
        return
    }

    const other = tryFindOther(player, origin)
    if (other) {
        console.log("handle other", other)
    }

    console.log("no hit")
}