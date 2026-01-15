import { DOOR } from "../../../../constants/doorConstants";
import { BASIC } from "../../../../constants/enemyConstants";
import { DOOR_01 } from "../../../../constants/floorConstants";
import { handleCreatePrompt } from "../../../../tool/handleCreatePrompt";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateEnemy } from "../../../creators/handleCreateEnemy";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";
import { handleCreateItem } from "../../../creators/handleCreateItem";
import { handleCreateProp } from "../../../creators/handleCreateProp";
import { consumableConstants } from "../../../interact/items/consumable/consumableConstants";
import { ammoConstants, weaponConstants } from "../../../interact/items/weapon/weaponConstants";

export const room_01 = {
    geometry: [
        handleCreateGeometry([4, 0, 0], [8, 8]),
        handleCreateGeometry([-3, 0, 2], [6, 4]),
        handleCreateGeometry([6, 0, 8], [4, 8])
    ],
    props: [
        handleCreateProp(
            [4, 0.4, 0],
            [1.5, 2, 1.5],
            {
                id: "prop_test_1",
                item: consumableConstants.REAGENT_GBY,
                prompt: handleCreatePrompt("This is a description. There's something here", "CONFIRMATION", "Take", "Leave"),
                success: handleCreatePrompt("The description could be different now.", "CONFIRMATION", false, "Back")
            }
        ),
        handleCreateProp([-2, 0.5, 3], [2, 1, 0.5]),
        handleCreateProp([-1, 0.5, 9], [10, 1, 10])
    ],
    stations: [],
    doors: [
        handleCreateDoor({
            id: DOOR_01,
            type: DOOR,
            position: [6, 11.8],
            direction: 1,
        }),
    ],
    enemies: [
        handleCreateEnemy([1, 0.5, 1], BASIC, '01_01_basic_01')
    ],
    items: [
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_G, '01_01_reagentg_01'),
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_G, '01_01_reagentg_02'),
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_B, '01_01_reagentb_01'),
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_R, '01_01_reagentr_01'),
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_Y, '01_01_reagenty_01'),
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_B, '01_01_reagentb_02'),
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_R, '01_01_reagentr_02'),
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_Y, '01_01_reagenty_02'),
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_B, '01_01_reagentb_03'),
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_R, '01_01_reagentr_03'),
        handleCreateItem([5, 0.15, 2], consumableConstants.REAGENT_Y, '01_01_reagenty_03'),
        handleCreateItem([2, 0.15, 2], weaponConstants.COLT, '01_01_colt_01'),
        handleCreateItem([2, 0.15, 2], ammoConstants.HANDGUNAMMO, '01_01_handgunAmmo_01')
    ],
    cameras: []
}