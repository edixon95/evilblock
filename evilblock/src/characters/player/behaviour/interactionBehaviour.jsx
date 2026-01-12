export const interactionBehaviour = ({ ctrl, input, ref, tryInteract }) => {
    if (ctrl.aiming) return;

    if (input.interact && !ctrl.prev.interact) {
        tryInteract(ref.current);
    }

    ctrl.prev.interact = input.interact;
};
