import { STAIR, UP } from "../../../../constants/doorConstants";
import { BASIC } from "../../../../constants/enemyConstants";
import { DOOR_02 } from "../../../../constants/floorConstants";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateEnemy } from "../../../creators/handleCreateEnemy";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";

export const room_02 = {
    geometry: [
        handleCreateGeometry([4, 0, 0], [10, 4]),
        handleCreateGeometry([-3, 0, 3], [4, 10])
    ],
    props: [],
    stations: [],
    doors: [
        handleCreateDoor({
            id: DOOR_02,
            type: STAIR,
            position: [-2, 5],
            direction: 3,
            stairDirection: UP
        })
    ],
    enemies: [
        handleCreateEnemy([1, 0, 1], BASIC)
    ],
    items: [],
    cameras: []
}