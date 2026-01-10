import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM, CONSUMABLELAST } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGGR = {
    id: consumableConstants.REAGENT_GGR,
    combineId: consumableConstants.REAGENT_GGR,
    name: "Reagent GGR",
    type: ITEM,
    subType: CONSUMABLE,
    options: interactActionPreset[CONSUMABLELAST],
    data: {
        useType: HEAL,
        value: 30
    },
    examine: "A double green with a touch of red. Stronger than GG.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GGR],
    isCollected: false
};
