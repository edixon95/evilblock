import { emitSound } from "../../../sound/SoundSystem"

const WALK_DELAY = 0.5;
const WALK_LEVEL = 2;
const RUN_LEVEL = 4;

export const soundBehaviour = ({ ctrl, input, ref, delta }) => {
    const moving = !ctrl.aiming && (input.forward || input.back);

    if (!moving) {
        ctrl.moveSoundTimer = 0;
        return;
    }

    ctrl.moveSoundTimer += delta;

    if (ctrl.moveSoundTimer >= WALK_DELAY) {
        emitSound(
            ref.current.position,
            input.run ? RUN_LEVEL : WALK_LEVEL,
            0.15
        );
        ctrl.moveSoundTimer = 0;
    }
};
