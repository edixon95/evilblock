import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM, CONSUMABLELAST } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGBY = {
    id: consumableConstants.REAGENT_GBY,
    combineId: consumableConstants.REAGENT_GBY,
    name: "Reagent GBY",
    type: ITEM,
    subType: CONSUMABLE,
    options: interactActionPreset[CONSUMABLELAST],
    data: {
        useType: HEAL,
        value: 25
    },
    examine: "A green, blue, and yellow reagent. Potent and reactive.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GBY],
    isCollected: false
};
