import { CONSUMABLE, WEAPON, NOTE, MAP, KEY, MATERIAL, CURRENCY, OTHER } from "../../../data/interact/interactConstants";


export const handleUserOther = (item) => {
    console.log(item)
    switch (item.subType) {
        case WEAPON:
            // handle weapon pickup and ammo random
            break;

        case CONSUMABLE:
            // Should just be a straight inventory add
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
            // Should be straight to inventory
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