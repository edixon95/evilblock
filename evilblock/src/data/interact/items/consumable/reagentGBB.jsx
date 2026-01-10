import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM, CONSUMABLELAST } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGBB = {
    id: consumableConstants.REAGENT_GBB,
    combineId: consumableConstants.REAGENT_GBB,
    name: "Reagent GBB",
    type: ITEM,
    subType: CONSUMABLE,
    options: interactActionPreset[CONSUMABLELAST],
    data: {
        useType: HEAL,
        value: 25
    },
    examine: "A green and double blue reagent. Stronger than GB alone.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GBB],
    isCollected: false
};
