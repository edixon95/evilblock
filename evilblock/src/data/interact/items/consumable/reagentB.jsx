import { interactActionPreset } from "../../interactAction";
import { MATERIAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentB = {
    id: consumableConstants.REAGENT_B,
    combineId: consumableConstants.REAGENT_B,
    name: "Reagent B",
    type: ITEM,
    subType: MATERIAL, // No G present
    options: interactActionPreset[MATERIAL],
    data: {
        useType: null,
        value: 0
    },
    examine: "A single blue reagent. It is chemically reactive but not restorative on its own.",
    combine: generateComboGraph()[consumableConstants.REAGENT_B],
    isCollected: false
};
