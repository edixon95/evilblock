import { DOOR, STAIR, UP } from "../../../../constants/doorConstants";
import { DOOR_00 } from "../../../../constants/floorConstants";
import { propConstants } from "../../../../objects/props/propConstants";
import { handleCreatePrompt } from "../../../../tool/handleCreatePrompt";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";
import { handleCreateLight } from "../../../creators/handleCreateLight";
import { handleCreatePrefab } from "../../../creators/handleCreatePrefab";
import { handleCreateProp } from "../../../creators/handleCreateProp";
import { handleCreateWeather } from "../../../creators/handleCreateWeather";

export const room_00 = {
    geometry: [
        handleCreateGeometry([-5, 0, 13], [15, 10], false, 1, "concrete_1"),
        handleCreateGeometry([-2.5, 0, 1.5], [20, 5], false, 1, "concrete_1"),
        handleCreateGeometry([-8, 0, -2.5], [9, 3], false, 1, "concrete_1"),
        handleCreateGeometry([3.5, 0, -3.5], [8, 5], false, 1, "concrete_1"),
        // handleCreateGeometry([-10, 0, 2], [10, 4]),
        handleCreateGeometry([5, 0, 8], [5, 8], false, 1, "concrete_1")
    ],
    props: [
        handleCreateProp([-7, 1, -1.7], [7, 3, 1.5], {
            canExamine: false
        }),

        handleCreateProp(
            [7, 0.25, 10],
            [1.5, 0.5, 5],
            {
                id: "prop_test_1",
                success: handleCreatePrompt("The trash has been piling up for a while.", "CONFIRMATION", false, "Back")
            }
        ),
        handleCreateProp([-11, 0.5, -0.25], [4, 0.75, 1.5], {
            id: "prop_test_2",
            prompt: handleCreatePrompt("A large box on wheels, it could probably be moved.", "CONFIRMATION", "Move", "Back"),
            success: handleCreatePrompt("A large box on wheels.", "CONFIRMATION", false, "Back"),
            action: {
                target: ["prop_test_2", "PLAYER"],
                type: "MOVE",
                speed: 1,
                position: [-11, 0.5, 1.5],
                onComplete: null
            }
        }),

        // Prefabs
        handleCreatePrefab(
            [3.5, 9],
            1,
            propConstants.TENT1,
            {
                id: "prop_test_3",
                success: handleCreatePrompt("Tent.", "CONFIRMATION", false, "Back")
            },
        ),
        handleCreatePrefab(
            [3.6, 7.2],
            1,
            propConstants.CHAIR1,
            {
                id: "prop_test_4",
                success: handleCreatePrompt("Chair.", "CONFIRMATION", false, "Back")
            },
        ),
    ],
    stations: [],
    doors: [
        handleCreateDoor({
            id: DOOR_00,
            type: STAIR,
            position: [-6.5, -4],
            direction: 1,
            stairDirection: UP
        }),
    ],
    enemies: [],
    items: [],
    cameras: [
        { // Start room 1
            id: "c_home_1",
            position: [-2.33, 0.347, 12.031],
            lookAt: [-3.264, -0.008, 12.072],
            boundingBox: [-8.5, 0.5, 15],
            size: [9, 1, 15]
        },
        { // Start room 2
            id: "c_home_2",
            position: [-7.36, 0.428, 8.31],
            lookAt: [-6.662, 0.272, 9.009],
            boundingBox: [-0.7, 0.5, 15],
            size: [5.5, 1, 15]
        },
        { // Alley 1
            id: "c_alley_1",
            position: [5.287, 3.44, 11.76],
            lookAt: [5.127, 2.651, 11.166],
            boundingBox: [5, 0.5, 8],
            size: [5, 1, 8]
        },
        { // Open area
            id: "c_alley_2",
            position: [6.379, 4.002, 1.544],
            lookAt: [5.886, 3.229, 1.944],
            boundingBox: [2, 0.5, 1.5],
            size: [11, 1, 4.5]
        },
        { // Open side
            id: "c_alley_3",
            position: [-0.322, 3.315, -0.343],
            lookAt: [0.206, 2.582, -0.772],
            boundingBox: [3.5, 0.5, -3.5],
            size: [8, 1, 4.5]
        },
        { // Before stair
            id: "c_alley_4",
            position: [-2.984, 2.257, 3.603],
            lookAt: [-3.712, 1.688, 3.221],
            boundingBox: [-8.3, 0.5, 1.5],
            size: [9, 1, 4.5]
        },
        { // stair
            id: "c_alley_5",
            position: [-10.841, 3.834, -2.47],
            lookAt: [-10.787, 2.838, -2.401],
            boundingBox: [-8.3, 0.5, -3.5],
            size: [9, 1, 4.5]
        }
    ],
    lights: [
        handleCreateLight("spotlight", { color: "#ffffff", intensity: 8, position: [-12, -2.5], height: null, angle: 3, penumbra: 0.2 }),
        handleCreateLight("rect", {
            color: "#ffffff",
            intensity: 3,
            position: [5, 12],
            height: 2,
            width: 3,
            rectHeight: 0.8,
            rotation: [0, 0, 0],
        }),
        handleCreateLight("rect", {
            color: "#ffffff",
            intensity: 12,
            position: [-13, 19],
            height: 2,
            width: 3,
            rectHeight: 0.8,
            rotation: [0, 0, 0],
        })
    ],
    weather: [
        handleCreateWeather("ambient", { intensity: 0.3, color: "#4056b8" }),
        handleCreateWeather("fog", { color: "#086357", near: -5, far: 20 })
    ]
}