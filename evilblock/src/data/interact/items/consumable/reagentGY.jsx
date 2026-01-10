import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGY = {
    id: consumableConstants.REAGENT_GY,
    combineId: consumableConstants.REAGENT_GY,
    name: "Reagent GY",
    type: ITEM,
    subType: CONSUMABLE, // Contains G
    options: interactActionPreset[CONSUMABLE],
    data: {
        useType: HEAL,
        value: 20
    },
    examine: "A green and yellow reagent combination. Potent and reactive.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GY],
    isCollected: false
};
