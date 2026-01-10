import { interactActionPreset } from "../../interactAction";
import { MATERIAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentRR = {
    id: consumableConstants.REAGENT_RR,
    combineId: consumableConstants.REAGENT_RR,
    name: "Reagent RR",
    type: ITEM,
    subType: MATERIAL, // No G
    options: interactActionPreset[MATERIAL],
    data: {
        useType: null,
        value: 0
    },
    examine: "A double red reagent. Alone it has no healing effect.",
    combine: generateComboGraph()[consumableConstants.REAGENT_RR],
    isCollected: false
};
