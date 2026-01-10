
import { useRef } from "react";
import { Enemy } from "../characters/enemy/Enemy"

export const liveEnemyRefs = [];

export const EnemyManager = ({ enemies }) => {
    if (!enemies) return null;
    liveEnemyRefs.length = 0;

    return (
        <>
            {enemies.map((enemy, i) => {
                const ref = useRef();
                liveEnemyRefs.push(ref);

                return <Enemy enemy={enemy} />
            })}
        </>
    );
};
