import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM, CONSUMABLELAST } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGRB = {
    id: consumableConstants.REAGENT_GRB,
    combineId: consumableConstants.REAGENT_GRB,
    name: "Reagent GRB",
    type: ITEM,
    subType: CONSUMABLE, // Contains G
    options: interactActionPreset[CONSUMABLELAST],
    data: {
        useType: HEAL,
        value: 28
    },
    examine: "A balanced green, red, and blue reagent. Potent and reactive.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GRB],
    isCollected: false
};
