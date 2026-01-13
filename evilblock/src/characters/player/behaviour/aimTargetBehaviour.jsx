import { getTargetEnemy } from "./shootingBehaviour";

export const aimTargetBehaviour = ({ ctrl, ref, weaponInfo }) => {
    if (!ctrl.aiming) {
        ctrl.focusedEnemy = null;
        return;
    }

    ctrl.focusedEnemy = getTargetEnemy(ref.current, weaponInfo);
};
