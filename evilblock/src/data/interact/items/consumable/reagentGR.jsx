import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGR = {
    id: consumableConstants.REAGENT_GR,
    combineId: consumableConstants.REAGENT_GR,
    name: "Reagent GR",
    type: ITEM,
    subType: CONSUMABLE, // Contains G
    options: interactActionPreset[CONSUMABLE],
    data: {
        useType: HEAL,
        value: 15
    },
    examine: "A green and red reagent combination. More potent than a single green.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GR],
    isCollected: false
};
