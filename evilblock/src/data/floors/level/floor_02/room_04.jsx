import { DOOR, DOWN, STAIR, UP } from "../../../../constants/doorConstants";
import { BASIC } from "../../../../constants/enemyConstants";
import { DOOR_02, DOOR_04, DOOR_06 } from "../../../../constants/floorConstants";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateEnemy } from "../../../creators/handleCreateEnemy";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";
import { handleCreateLight } from "../../../creators/handleCreateLight";
import { handleCreateWeather } from "../../../creators/handleCreateWeather";

export const room_04 = {
    geometry: [
        handleCreateGeometry([5, 0, 0], [4, 2]),
        handleCreateGeometry([5, 0, 1], [2, 1]),
        handleCreateGeometry([5, 0, -1], [2, 1]),
        handleCreateGeometry([6, 0, 3.5], [4, 4]),
        handleCreateGeometry([7, 0, -3.5], [6, 4]),
        handleCreateGeometry([1.5, 0, 4], [3, 10]),
    ],
    props: [],
    stations: [],
    doors: [
        handleCreateDoor({
            id: DOOR_06,
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
            id: "c_entry_r04_01",
            position: [0.715, 1.372, -0.549],
            lookAt: [1.246, 0.859, 0.125],
            boundingBox: [1.7, 0.5, 3],
            size: [4, 1, 14]
        },
        { // Start room 1
            id: "c_entry_r04_02",
            position: [6.749, 4.121, -3.35],
            lookAt: [6.749, 3.121, -3.35],

            boundingBox: [7, 0.5, -4],
            size: [6, 1, 5]
        },
        { // Start room 1
            id: "c_entry_r04_03",
            position: [4.41, 2.536, 4.64],
            lookAt: [4.994, 1.772, 4.365],
            boundingBox: [6, 0.5, 1.2],
            size: [4, 1, 5]
        },
    ],
    lights: [

    ],
    weather: [
        handleCreateWeather("ambient", { intensity: 0.3, color: "#a1a7c2" }),
        handleCreateWeather("fog", { color: "#436e69", near: 0, far: 25 })
    ]
}