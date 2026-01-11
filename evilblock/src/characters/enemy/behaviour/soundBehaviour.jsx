import { findSoundTarget } from "../actions/findSoundTarget";

export const soundBehaviour = (ctx) => {
    const { enemy, ref, ctrl, grid, getSoundEvents } = ctx;

    if (ctrl.intent === "player") return false;

    const soundResult = findSoundTarget(enemy, ref, getSoundEvents, grid);
    if (!soundResult) return false;

    if (
        ctrl.intent === "sound" &&
        ctrl.soundTargetId === soundResult.soundId
    ) {
        return false;
    }

    ctrl.path = soundResult.path;
    ctrl.targetIndex = 0;
    ctrl.intent = "sound";
    ctrl.soundTargetId = soundResult.soundId;
    ctrl.idleTimer = 0;

    return false;
};
