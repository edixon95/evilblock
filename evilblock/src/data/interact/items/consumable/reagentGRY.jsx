import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM, CONSUMABLELAST } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGRY = {
    id: consumableConstants.REAGENT_GRY,
    combineId: consumableConstants.REAGENT_GRY,
    name: "Reagent GRY",
    type: ITEM,
    subType: CONSUMABLE,
    options: interactActionPreset[CONSUMABLELAST],
    data: {
        useType: HEAL,
        value: 25
    },
    examine: "A green, red, and yellow reagent. Potent and reactive.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GRY],
    isCollected: false
};
