export const aimBehaviour = ({ ctrl, input }) => {
    if (input.aim && !ctrl.prev.aim) {
        ctrl.aiming = !ctrl.aiming;
    }

    ctrl.prev.aim = input.aim;
};
