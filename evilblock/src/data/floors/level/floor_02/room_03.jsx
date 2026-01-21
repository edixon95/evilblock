import { DOOR, DOWN, STAIR, UP } from "../../../../constants/doorConstants";
import { BASIC } from "../../../../constants/enemyConstants";
import { DOOR_02, DOOR_04 } from "../../../../constants/floorConstants";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateEnemy } from "../../../creators/handleCreateEnemy";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";
import { handleCreateLight } from "../../../creators/handleCreateLight";
import { handleCreateWeather } from "../../../creators/handleCreateWeather";

export const room_03 = {
    geometry: [
        // handleCreateGeometry([-2, 0, 0], [4, 2]),
        handleCreateGeometry([1.5, 0, 4], [3, 15]),
        handleCreateGeometry([1.5, 0, 13.5], [5, 4]),
    ],
    props: [],
    stations: [],
    doors: [
        handleCreateDoor({
            id: DOOR_04,
            type: DOOR,
            position: [0.1, 7.5],
            direction: 4,
        })
    ],
    enemies: [
    ],
    items: [],
    cameras: [
        { // Start room 1
            id: "c_entry_r03_01",
            position: [0.567, 2.714, 11.023],
            lookAt: [0.775, 2.105, 10.258],
            boundingBox: [1.7, 0.5, 3],
            size: [4, 1, 14]
        },
        { // Start room 1
            id: "c_entry_r03_02",
            position: [1.615, 2.537, 9.023],
            lookAt: [1.612, 1.96, 9.84],
            boundingBox: [1.7, 0.5, 12.1],
            size: [5, 1, 4]
        },
    ],
    lights: [

    ],
    weather: [
        handleCreateWeather("ambient", { intensity: 0.3, color: "#a1a7c2" }),
        handleCreateWeather("fog", { color: "#436e69", near: 0, far: 25 })
    ]
}