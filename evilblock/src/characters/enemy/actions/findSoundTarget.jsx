import * as THREE from "three";
import { findPath } from "../pathfinding";

export const findSoundTarget = (enemy, ref, getSoundEvents, grid) => {
    const sounds = getSoundEvents?.() ?? [];
    for (const sound of sounds) {
        if (ref.current.position.distanceTo(sound.position) <= sound.radius) {
            // TODO: add seperation 

            // const offset = new THREE.Vector3(
            //     (Math.random() - 0.5) * enemy.separation * 2,
            //     0,
            //     (Math.random() - 0.5) * enemy.separation * 2
            // );

            const offset = new THREE.Vector3(
                (Math.random() - 0.5) * 0.5 * 2,
                0,
                (Math.random() - 0.5) * 0.5 * 2
            );

            const targetPos = sound.position.clone().add(offset);
            const path = findPath(grid, ref.current.position, targetPos);

            if (path?.length) {
                return {
                    path,
                    soundId: sound.id ?? sound
                };
            }
        }
    }
    return null;
};
