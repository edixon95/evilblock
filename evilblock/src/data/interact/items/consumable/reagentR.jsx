import { interactActionPreset } from "../../interactAction";
import { MATERIAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentR = {
    id: consumableConstants.REAGENT_R,
    combineId: consumableConstants.REAGENT_R,
    name: "Reagent R",
    type: ITEM,
    subType: MATERIAL, // No G present
    options: interactActionPreset[MATERIAL],
    data: {
        useType: null,
        value: 0
    },
    examine: "A single red reagent. It is chemically reactive but not restorative on its own.",
    combine: generateComboGraph()[consumableConstants.REAGENT_R],
    isCollected: false
};
