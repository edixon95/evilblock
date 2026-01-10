import { interactActionPreset } from "../../interactAction";
import { MATERIAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentBY = {
    id: consumableConstants.REAGENT_BY,
    combineId: consumableConstants.REAGENT_BY,
    name: "Reagent BY",
    type: ITEM,
    subType: MATERIAL, // No G
    options: interactActionPreset[MATERIAL],
    data: {
        useType: null,
        value: 0
    },
    examine: "A blue and yellow reagent combination. Alone it does not heal.",
    combine: generateComboGraph()[consumableConstants.REAGENT_BY],
    isCollected: false
};
