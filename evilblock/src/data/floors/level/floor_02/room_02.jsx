import { DOOR, DOWN, STAIR, UP } from "../../../../constants/doorConstants";
import { BASIC } from "../../../../constants/enemyConstants";
import { DOOR_02, DOOR_03 } from "../../../../constants/floorConstants";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateEnemy } from "../../../creators/handleCreateEnemy";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";
import { handleCreateLight } from "../../../creators/handleCreateLight";
import { handleCreateWeather } from "../../../creators/handleCreateWeather";

export const room_02 = {
    geometry: [
        handleCreateGeometry([-2, 0, 0], [4, 2]),
        handleCreateGeometry([-3, 0, 3], [2, 4]),
        // handleCreateGeometry([-2, 0, 0], [4, 2]),
        handleCreateGeometry([1.5, 0, 4], [3, 10]),
        handleCreateGeometry([4, 0, 4], [4, 2]),
        handleCreateGeometry([6, 0, 4], [4, 6]),
    ],
    props: [],
    stations: [],
    doors: [
        handleCreateDoor({
            id: DOOR_02,
            type: DOOR,
            position: [0.1, 7.5],
            direction: 4,
        }),
        handleCreateDoor({
            id: DOOR_03,
            type: DOOR,
            position: [-4, 3.5],
            direction: 4,
        })
    ],
    enemies: [
    ],
    items: [],
    cameras: [
        { // Start room 1
            id: "c_entry_r02_01",
            position: [0.522, 3.35, 8.584],
            lookAt: [0.722, 2.548, 8.021],
            boundingBox: [1.7, 0.5, 7.5],
            size: [4, 1, 5]
        },
        { // Start room 1
            id: "c_entry_r02_02",
            position: [7.145, 4.203, 3.429],
            lookAt: [6.761, 3.284, 3.513],
            boundingBox: [2.2, 0.5, 4],
            size: [5, 1, 2]
        },
        { // Start room 1
            id: "c_entry_r02_03",
            position: [2.54, 3.329, -0.304],
            lookAt: [2.203, 2.491, 0.126],
            boundingBox: [1, 0.5, 0.45],
            size: [4, 1, 5]
        },
        { // Start room 1
            id: "c_entry_r02_04",
            position: [-3.768, 0.488, 4.72],
            lookAt: [-3.184, 0.232, 3.949],
            boundingBox: [-3.25, 0.5, 2],
            size: [4, 1, 6]
        },
    ],
    lights: [

    ],
    weather: [
        handleCreateWeather("ambient", { intensity: 0.3, color: "#a1a7c2" }),
        handleCreateWeather("fog", { color: "#436e69", near: 0, far: 25 })
    ]
}