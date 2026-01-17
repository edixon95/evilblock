import { DOOR, STAIR, UP } from "../../../../constants/doorConstants";
import { DOOR_00 } from "../../../../constants/floorConstants";
import { handleCreatePrompt } from "../../../../tool/handleCreatePrompt";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";
import { handleCreateProp } from "../../../creators/handleCreateProp";

export const room_00 = {
    geometry: [
        handleCreateGeometry([-2.5, 0, 1.5], [20, 5], false, 1, "concrete_1"),
        handleCreateGeometry([-8, 0, -2.5], [9, 3], false, 1, "concrete_1"),
        handleCreateGeometry([3.5, 0, -3.5], [8, 5], false, 1, "concrete_1"),
        // handleCreateGeometry([-10, 0, 2], [10, 4]),
        handleCreateGeometry([5, 0, 8], [5, 8], false, 1, "concrete_1")
    ],
    props: [
        handleCreateProp(
            [7, 0.25, 10],
            [1.5, 0.5, 5],
            {
                id: "prop_test_1",
                success: handleCreatePrompt("The trash has been piling up for a while.", "CONFIRMATION", false, "Back")
            }
        ),
        handleCreateProp([-7, 1, -1.7], [7, 3, 1.5], {
            canExamine: false
        }),
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
    ]
}