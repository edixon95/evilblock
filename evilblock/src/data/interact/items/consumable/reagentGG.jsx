import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGG = {
    id: consumableConstants.REAGENT_GG,
    combineId: consumableConstants.REAGENT_GG,
    name: "Reagent GG",
    type: ITEM,
    subType: CONSUMABLE, // Contains G
    options: interactActionPreset[CONSUMABLE],
    data: {
        useType: HEAL,
        value: 20
    },
    examine: "A more potent green reagent, doubled in strength.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GG],
    isCollected: false
};
