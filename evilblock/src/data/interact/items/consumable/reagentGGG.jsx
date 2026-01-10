import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM, CONSUMABLELAST } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGGG = {
    id: consumableConstants.REAGENT_GGG,
    combineId: consumableConstants.REAGENT_GGG,
    name: "Reagent GGG",
    type: ITEM,
    subType: CONSUMABLE,
    options: interactActionPreset[CONSUMABLELAST],
    data: {
        useType: HEAL,
        value: 35
    },
    examine: "A highly potent green reagent, tripled in strength.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GGG],
    isCollected: false
};
