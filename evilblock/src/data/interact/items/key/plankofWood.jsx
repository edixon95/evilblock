import { interactActionPreset } from "../../interactAction";
import { ITEM, KEY } from "../../interactConstants";

export const plankOfWood = {
    id: "plank_of_wood",
    name: "Plank of Wood",
    type: ITEM,
    subType: KEY,
    options: interactActionPreset[KEY],
    examine: "Half broken already, not exactly a prize pull",
}