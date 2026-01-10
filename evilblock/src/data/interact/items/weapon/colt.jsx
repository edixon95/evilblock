import { interactActionPreset } from "../../interactAction";
import { ITEM, RELOAD, WEAPON } from "../../interactConstants";
import { ammoConstants, weaponConstants } from "./weaponConstants";

export const colt = {
    id: weaponConstants.COLT,
    combineId: weaponConstants.COLT,
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
    examine: "This is a weapon, meow.",
    combine: {
        [ammoConstants.HANDGUNAMMO]: {
            type: RELOAD,
            weapons: [weaponConstants.COLT]
        }
    },
    isCollected: false
}