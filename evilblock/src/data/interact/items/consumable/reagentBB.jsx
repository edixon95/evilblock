import { interactActionPreset } from "../../interactAction";
import { MATERIAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentBB = {
    id: consumableConstants.REAGENT_BB,
    combineId: consumableConstants.REAGENT_BB,
    name: "Reagent BB",
    type: ITEM,
    subType: MATERIAL, // No G
    options: interactActionPreset[MATERIAL],
    data: {
        useType: null,
        value: 0
    },
    examine: "A double blue reagent. It is chemically reactive but not restorative.",
    combine: generateComboGraph()[consumableConstants.REAGENT_BB],
    isCollected: false
};
