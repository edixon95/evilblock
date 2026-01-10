import { interactActionPreset } from "../../interactAction";
import { CONSUMABLE, HEAL, ITEM, CONSUMABLELAST } from "../../interactConstants";
import { consumableConstants } from "./consumableConstants";
import { generateComboGraph } from "./consumableGraph";

export const reagentGRR = {
    id: consumableConstants.REAGENT_GRR,
    combineId: consumableConstants.REAGENT_GRR,
    name: "Reagent GRR",
    type: ITEM,
    subType: CONSUMABLE,
    options: interactActionPreset[CONSUMABLELAST],
    data: {
        useType: HEAL,
        value: 25
    },
    examine: "A green and double red reagent. Stronger than GR alone.",
    combine: generateComboGraph()[consumableConstants.REAGENT_GRR],
    isCollected: false
};
