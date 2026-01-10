import { interactActionPreset } from "../../interactAction";
import { MATERIAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentRY = {
    id: consumableConstants.REAGENT_RY,
    combineId: consumableConstants.REAGENT_RY,
    name: "Reagent RY",
    type: ITEM,
    subType: MATERIAL, // No G
    options: interactActionPreset[MATERIAL],
    data: {
        useType: null,
        value: 0
    },
    examine: "A red and yellow reagent combination. Reactive but non-healing.",
    combine: generateComboGraph()[consumableConstants.REAGENT_RY],
    isCollected: false
};
