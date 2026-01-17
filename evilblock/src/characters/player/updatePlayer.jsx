import { aimBehaviour } from "./behaviour/aimBehaviour";
import { interactionBehaviour } from "./behaviour/interactionBehaviour";
import { soundBehaviour } from "./behaviour/soundBehaviour";
import { shootingBehaviour } from "./behaviour/shootingBehaviour";
import { movementBehaviour } from "./behaviour/movementBehaviour";
import { useGameStore } from "../../stores/useGameStore";
import { stabilityBehaviour } from "./behaviour/stabilityBehaviour";
import { aimTargetBehaviour } from "./behaviour/aimTargetBehaviour";

let prevMenuPressed = false;

export const updatePlayer = (ctx) => {
    const { input, menuActive } = ctx;
    if (input.menu && !prevMenuPressed) {
        if (!menuActive) {
            useGameStore.getState().handleOpenMenu("pause");
        }
    }
    prevMenuPressed = input.menu;

    // Stop gameplay while menu is active
    if (menuActive) return;

    aimBehaviour(ctx);
    stabilityBehaviour(ctx);
    aimTargetBehaviour(ctx)
    shootingBehaviour(ctx);
    interactionBehaviour(ctx);
    movementBehaviour(ctx);
    soundBehaviour(ctx);
};
