import { CONSUMABLE, WEAPON, NOTE, MAP, KEY, MATERIAL, CURRENCY, OTHER, AMMO } from "../../../data/interact/interactConstants";
import { tryPickupItem, tryPickupWepon } from "./subTask/tryPickupItem"

export const handleUserOther = (item) => {
    switch (item.userData.subType) {
        case WEAPON:
            tryPickupWepon(item)
            break;

        case CONSUMABLE:
            tryPickupItem(item)
            break;

        case AMMO:
            tryPickupItem(item)
            break;

        case NOTE:
            // Note/Map to menu storage, does not require space
            break;

        case MAP:
            // Note/Map to menu storage, does not require space
            break;

        case KEY:
            // Should be straight to inventory
            break;

        case MATERIAL:
            tryPickupItem(item)
            break;

        case CURRENCY:
            // Should be straight to inventory, does not require space
            break;

        case OTHER:
            // Unsure if will be used
            break;

        default:
            break;
    }

}