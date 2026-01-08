import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";

export const greenHerb = {
    id: consumableConstants.GREENHERB,
    name: "Green Herb",
    type: ITEM,
    subType: CONSUMABLE,
    options: interactActionPreset[CONSUMABLE],
    data: {
        useType: HEAL,
        value: 25
    },
    isCollected: false
}