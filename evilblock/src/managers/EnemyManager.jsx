// EnemyManager.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Enemy } from "../characters/enemy/Enemy";
import { updateEnemy } from "../characters/enemy/enemyController";
import { createNavigation } from "../characters/enemy/createNavigation";
import { wallMeshes } from "./WallManager";

export const liveEnemyRefs = { current: [] };

export const EnemyManager = ({ enemies, floors }) => {
    const enemyRefs = useRef([]);
    const navigation = useRef(null);

    // Keep refs in sync with enemies
    enemyRefs.current = enemies.map(
        (_, i) => enemyRefs.current[i] ?? { current: null }
    );
    liveEnemyRefs.current = enemyRefs.current;

    // Wait until all walls have valid current refs
    const getBlockableMeshes = () =>
        wallMeshes
            .map((w) => w.current)
            .filter(Boolean);

    useFrame((_, delta) => {
        const blockableMeshes = getBlockableMeshes();

        if (!navigation.current && blockableMeshes.length > 0) {
            navigation.current = createNavigation(floors, blockableMeshes);
        }

        if (!navigation.current) return;

        enemies.forEach((enemy, i) => {
            const ref = enemyRefs.current[i];
            if (!ref?.current || !enemy.isAlive) return;

            // one-time position initialization
            if (!enemy._initialized) {
                const [x, y, z] = enemy.position;
                ref.current.position.set(x, y, z);
                enemy._initialized = true;
            }

            updateEnemy(enemy, ref, navigation.current, delta);
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
