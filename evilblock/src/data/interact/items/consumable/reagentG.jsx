import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentG = {
    id: consumableConstants.REAGENT_G,
    combineId: consumableConstants.REAGENT_G,
    name: "Reagent G",
    type: ITEM,
    subType: CONSUMABLE,
    options: interactActionPreset[CONSUMABLE],
    data: {
        useType: HEAL,
        value: 10
    },
    examine: "A fresh green reagent. Basic restorative properties.",
    combine: generateComboGraph()[consumableConstants.REAGENT_G],
    isCollected: false
};
