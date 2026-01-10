import { interactActionPreset } from "../../interactAction";
import { MATERIAL, ITEM } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentY = {
    id: consumableConstants.REAGENT_Y,
    combineId: consumableConstants.REAGENT_Y,
    name: "Reagent Y",
    type: ITEM,
    subType: MATERIAL, // No G present
    options: interactActionPreset[MATERIAL],
    data: {
        useType: null,
        value: 0
    },
    examine: "A thin yellow reagent. Alone it has little effect, but it reacts strongly with other reagents.",
    combine: generateComboGraph()[consumableConstants.REAGENT_Y],
    isCollected: false
};
