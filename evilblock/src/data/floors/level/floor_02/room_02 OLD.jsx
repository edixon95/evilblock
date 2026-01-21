import { DOWN, STAIR, UP } from "../../../../constants/doorConstants";
import { BASIC } from "../../../../constants/enemyConstants";
import { DOOR_02 } from "../../../../constants/floorConstants";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateEnemy } from "../../../creators/handleCreateEnemy";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";
import { handleCreateLight } from "../../../creators/handleCreateLight";
import { handleCreateWeather } from "../../../creators/handleCreateWeather";

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
    ],
    items: [],
    cameras: [],
    lights: [

    ],
    weather: [
        handleCreateWeather("ambient", { intensity: 0.3, color: "#4056b8" }),
        handleCreateWeather("fog", { color: "#086357", near: -5, far: 20 })
    ]
}