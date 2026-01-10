import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM, CONSUMABLELAST } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGGY = {
    id: consumableConstants.REAGENT_GGY,
    combineId: consumableConstants.REAGENT_GGY,
    name: "Reagent GGY",
    type: ITEM,
    subType: CONSUMABLE,
    options: interactActionPreset[CONSUMABLELAST],
    data: {
        useType: HEAL,
        value: 30
    },
    examine: "A double green with a hint of yellow. Strong and reactive.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GGY],
    isCollected: false
};
