// EnemyManager.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Enemy } from "../characters/enemy/Enemy";
import { updateEnemy } from "../characters/enemy/enemyController";

export const liveEnemyRefs = { current: [] };

export const EnemyManager = ({ enemies, navigation }) => {
    const enemyRefs = useRef([]);

    // Keep refs in sync
    enemyRefs.current = enemies.map(
        (_, i) => enemyRefs.current[i] ?? { current: null }
    );
    liveEnemyRefs.current = enemyRefs.current;

    useFrame((_, delta) => {
        enemies.forEach((enemy, i) => {
            const ref = enemyRefs.current[i];
            if (!ref?.current || !enemy.isAlive) return;

            if (!enemy._initialized) {
                const [x, y, z] = enemy.position;
                ref.current.position.set(x, y, z);
                enemy._initialized = true;
            }

            updateEnemy(enemy, ref, navigation, delta);
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
