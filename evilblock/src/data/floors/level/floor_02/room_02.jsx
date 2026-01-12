import { DOWN, STAIR, UP } from "../../../../constants/doorConstants";
import { BASIC } from "../../../../constants/enemyConstants";
import { DOOR_02 } from "../../../../constants/floorConstants";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateEnemy } from "../../../creators/handleCreateEnemy";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";

export const room_02 = {
    geometry: [
        handleCreateGeometry([4, 0, 0], [10, 4]),
        handleCreateGeometry([2, 0, 4], [4, 10]),
        handleCreateGeometry([-1.5, 0, 7.8], [3, 2], true)
    ],
    props: [],
    stations: [],
    doors: [
        handleCreateDoor({
            id: DOOR_02,
            type: STAIR,
            position: [-3, 6.7],
            direction: 1,
            stairDirection: DOWN
        })
    ],
    enemies: [
        handleCreateEnemy([1, 0.5, 1], BASIC, '02_02_basic_01'),
        handleCreateEnemy([3, 0.5, 1], BASIC, '02_02_basic_02'),
    ],
    items: [],
    cameras: []
}