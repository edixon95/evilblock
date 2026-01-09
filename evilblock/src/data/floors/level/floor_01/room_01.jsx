import { DOOR } from "../../../../constants/doorConstants";
import { BASIC } from "../../../../constants/enemyConstants";
import { DOOR_01 } from "../../../../constants/floorConstants";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateEnemy } from "../../../creators/handleCreateEnemy";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";
import { handleCreateItem } from "../../../creators/handleCreateItem";
import { consumableConstants } from "../../../interact/items/consumable/consumableConstants";
import { ammoConstants, weaponConstants } from "../../../interact/items/weapon/weaponConstants";

export const room_01 = {
    geometry: [
        handleCreateGeometry([4, 0, 0], [8, 8]),
        handleCreateGeometry([-3, 0, 2], [6, 4]),
        handleCreateGeometry([6, 0, 8], [4, 8])
    ],
    props: [],
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
        handleCreateEnemy([1, 0, 1], BASIC, '01_01_basic_01')
    ],
    items: [
        handleCreateItem([5, 0.15, 2], consumableConstants.GREENHERB, '01_01_greenherb_01'),
        handleCreateItem([2, 0.15, 2], weaponConstants.COLT, '01_01_colt_01'),
        handleCreateItem([2, 0.15, 2], ammoConstants.HANDGUNAMMO, '01_01_handgunAmmo_01')
    ],
    cameras: []
}