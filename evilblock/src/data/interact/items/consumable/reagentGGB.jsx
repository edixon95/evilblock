import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM, CONSUMABLELAST } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGGB = {
    id: consumableConstants.REAGENT_GGB,
    combineId: consumableConstants.REAGENT_GGB,
    name: "Reagent GGB",
    type: ITEM,
    subType: CONSUMABLE,
    options: interactActionPreset[CONSUMABLELAST],
    data: {
        useType: HEAL,
        value: 30
    },
    examine: "A double green with a touch of blue. Stronger than GG.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GGB],
    isCollected: false
};
