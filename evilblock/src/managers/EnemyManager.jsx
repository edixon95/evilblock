import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Enemy } from "../characters/enemy/Enemy";
import { createNavigation } from "../characters/enemy/createNavigation";
import { wallMeshes } from "./WallManager";
import { propMeshes } from "./PropManager";
import { soundEvents } from "../sound/SoundSystem";

import { useThree } from "@react-three/fiber";
import { drawVisionConeDebug } from "../tool/drawVisionCone";

export const liveEnemyRefs = { current: [] };

export const EnemyManager = ({ enemies, floors, playerRef }) => {
    const enemyRefs = useRef([]);
    const navigationRef = useRef(null);
    const { scene } = useThree();

    // sync refs
    enemyRefs.current = enemies.map((_, i) => enemyRefs.current[i] ?? { current: null });
    liveEnemyRefs.current = enemyRefs.current;

    const getBlockableMeshes = () => [...wallMeshes, ...propMeshes].map(r => r.current).filter(Boolean);

    useFrame((_, delta) => {
        const blockableMeshes = getBlockableMeshes();

        if (!navigationRef.current && blockableMeshes.length) {
            navigationRef.current = createNavigation(floors, blockableMeshes, () => soundEvents, playerRef);
        }
        if (!navigationRef.current) return;

        enemies.forEach((enemy, i) => {
            const ref = enemyRefs.current[i];
            if (!ref?.current || !enemy.isAlive) return;
            if (!ref.current._initialized) {
                const [x, y, z] = enemy.position;
                ref.current.position.set(x, y, z);

                if (enemy.rotation) {
                    ref.current.rotation.copy(enemy.rotation);
                }

                const visualGroup = ref.current.children[0];
                enemy._upperRef = visualGroup.children[1];
                enemy._lowerRef = visualGroup.children[0];
                ref.current._initialized = true; // Keep this off the actual enemy
            }
            const debug = false;
            if (debug) {
                drawVisionConeDebug(enemy, ref, scene);
            }

            enemy._despawnPos = ref.current.position;
            enemy._despawnRotation = ref.current.rotation;
            navigationRef.current.updateEnemy(enemy, ref, delta);
        });
    });

    return (
        <>
            {enemies.filter((enemy) => enemy.isAlive).map((enemy, i) => (
                <Enemy key={enemy.id} enemy={enemy} ref={enemyRefs.current[i]} />
            ))}
        </>
    );
};
