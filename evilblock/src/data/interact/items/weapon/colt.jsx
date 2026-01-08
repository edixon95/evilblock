import { interactActionPreset } from "../../interactAction";
import { ITEM, WEAPON } from "../../interactConstants";
import { weaponConstants } from "./weaponConstants";

export const colt = {
    id: weaponConstants.COLT,
    name: "Colt",
    type: ITEM,
    subType: WEAPON,
    options: interactActionPreset[WEAPON],
    data: {
        damage: 10,
        maximumAmmo: 10,
        currentAmmo: 0,
        delay: 3
    },
    isCollected: false
}