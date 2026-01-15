import { CONSUMABLE, WEAPON, NOTE, MAP, KEY, MATERIAL, CURRENCY, OTHER, AMMO, PROP } from "../../../data/interact/interactConstants";
import { handlePropInteract } from "./subTask/handlePropInteract";
import { tryPickupItem, tryPickupWeapon } from "./subTask/tryPickupItem"

// TODO: add middle screen for newly picked up items
// TODO: add props with descriptions, perhaps that's the "other"?
export const handleUserOther = (item) => {
    switch (item.userData.subType) {
        case WEAPON:
            tryPickupWeapon(item)
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

        case PROP:
            handlePropInteract(item)
            break;

        case OTHER:
            // Unsure if will be used
            break;

        default:
            break;
    }

}