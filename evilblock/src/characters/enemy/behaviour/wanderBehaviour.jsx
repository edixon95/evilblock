import { stingometer } from "../../../helpers/stingometer";
import { findPath } from "../pathfinding";

export const wanderBehaviour = (ctx) => {
    const {
        enemy,
        ref,
        ctrl,
        grid,
        delta,
        pickRandomPoint
    } = ctx;

    if (ctrl.path && ctrl.targetIndex < ctrl.path.length) return false;

    ctrl.idleTimer += delta;
    if (ctrl.idleTimer < 3) return true;

    ctrl.idleTimer = 0;

    if (stingometer(1, 10) <= enemy.moveChance) {
        const target = pickRandomPoint();
        ctrl.path = findPath(grid, ref.current.position, target);
        ctrl.targetIndex = 0;
        ctrl.intent = "wander";
    }

    return true;
};
