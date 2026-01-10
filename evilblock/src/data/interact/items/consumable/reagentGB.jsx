import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGB = {
    id: consumableConstants.REAGENT_GB,
    combineId: consumableConstants.REAGENT_GB,
    name: "Reagent GB",
    type: ITEM,
    subType: CONSUMABLE, // Contains G
    options: interactActionPreset[CONSUMABLE],
    data: {
        useType: HEAL,
        value: 15
    },
    examine: "A green and blue reagent combination. Slightly more potent than green alone.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GB],
    isCollected: false
};
