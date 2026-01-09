import { interactActionPreset } from "../../../interactAction";
import { AMMO, ITEM, RELOAD } from "../../../interactConstants";
import { ammoConstants, weaponConstants } from "../weaponConstants";

export const handgunAmmo = {
    id: ammoConstants.HANDGUNAMMO,
    name: "Handgun Ammo",
    type: ITEM,
    subType: AMMO,
    options: interactActionPreset[AMMO],
    data: {
        minimumAmmo: 1,
        maximumAmmo: 10,
    },
    examine: "This is a weapon ammo, woof woof.",
    combine: {
        [weaponConstants.COLT]: {
            type: RELOAD,
            weapons: [weaponConstants.COLT]
        }
    },
    isCollected: false
}