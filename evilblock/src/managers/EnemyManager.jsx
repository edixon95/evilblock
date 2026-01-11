import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Enemy } from "../characters/enemy/Enemy";
import { createNavigation } from "../characters/enemy/createNavigation";
import { wallMeshes } from "./WallManager";
import { propMeshes } from "./PropManager";
import { soundEvents } from "../sound/SoundSystem";

export const liveEnemyRefs = { current: [] };

export const EnemyManager = ({ enemies, floors }) => {
    const enemyRefs = useRef([]);
    const navigationRef = useRef(null);

    // sync refs
    enemyRefs.current = enemies.map((_, i) => enemyRefs.current[i] ?? { current: null });
    liveEnemyRefs.current = enemyRefs.current;

    const getBlockableMeshes = () => [...wallMeshes, ...propMeshes].map(r => r.current).filter(Boolean);

    useFrame((_, delta) => {
        const blockableMeshes = getBlockableMeshes();

        if (!navigationRef.current && blockableMeshes.length) {
            navigationRef.current = createNavigation(floors, blockableMeshes, () => soundEvents);
        }
        if (!navigationRef.current) return;

        enemies.forEach((enemy, i) => {
            const ref = enemyRefs.current[i];
            if (!ref?.current || !enemy.isAlive) return;

            if (!enemy._initialized) {
                const [x, y, z] = enemy.position;
                ref.current.position.set(x, y, z);
                enemy._initialized = true;
            }

            navigationRef.current.updateEnemy(enemy, ref, delta);
        });
    });

    return (
        <>
            {enemies.map((enemy, i) => (
                <Enemy key={enemy.id} enemy={enemy} ref={enemyRefs.current[i]} />
            ))}
        </>
    );
};
