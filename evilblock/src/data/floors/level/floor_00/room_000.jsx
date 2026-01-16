import { DOOR, DOWN, STAIR, UP } from "../../../../constants/doorConstants";
import { DOOR_00, DOOR_001, DOOR_002 } from "../../../../constants/floorConstants";
import { handleCreatePrompt } from "../../../../tool/handleCreatePrompt";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";
import { handleCreateProp } from "../../../creators/handleCreateProp";
import { consumableConstants } from "../../../interact/items/consumable/consumableConstants";

export const room_000 = {
    geometry: [
        handleCreateGeometry([-2, 0, -2.5], [3, 3]),
        handleCreateGeometry([-2, 0, -3.5], [3, 5]),
        handleCreateGeometry([-4.5, 0, -6], [8, 5]),
        handleCreateGeometry([-4.5, 0, -4.5], [4, 2]),
    ],
    props: [
        // handleCreateProp(
        //     [7, 0.25, 10],
        //     [1.5, 0.5, 5],
        //     {
        //         id: "prop_test_1",
        //         success: handleCreatePrompt("The trash has been piling up for a while.", "CONFIRMATION", false, "Back")
        //     }
        // ),
        handleCreateProp([-5, -2, -4], [3.5, 5, 1], { // Inner wall prop
            canExamine: false
        }),
        handleCreateProp([-7.5, 0.5, -6.3], [2, 1, 5], { // Garbage pile
            id: "pile_1",
            item: consumableConstants.REAGENT_GBY,
            prompt: handleCreatePrompt("A heap of broken, abandoned things. Several lifetimes of discarded belongings, there is probably something useful within.", "CONFIRMATION", "Look", "Back"),
            success: handleCreatePrompt("The pile of discarded belongings has given all it will", "CONFIRMATION", false, "Back"),
            customText: "The pile puts up more of a fight than first thought... You manage to pry some wood free and hold onto it."
        }),
        handleCreateProp([-2, 0.25, -1.25], [3, 0.5, 0.5], { // Short edge outer
            success: handleCreatePrompt("From a height, the piled up garbage looks like a small kingdom", "CONFIRMATION", false, "Back")
        }),
        handleCreateProp([-0.75, 0.25, -3.5], [0.5, 0.5, 5], { // long edge outer
            success: handleCreatePrompt("The world doesn't appear any happier from a height", "CONFIRMATION", false, "Back")
        }),
    ],
    stations: [],
    doors: [
        handleCreateDoor({
            id: DOOR_001,
            type: STAIR,
            position: [-6.5, -3.5],
            direction: 1,
            stairDirection: DOWN
        }),
        handleCreateDoor({
            id: DOOR_002,
            type: DOOR,
            position: [-1.5, -8.25],
            direction: 3,
        }),
    ],
    enemies: [],
    items: [],
    cameras: [
        { // Alley 1
            id: "c_alley_up_1",
            position: [-1.872, 1.827, 0.142],
            lookAt: [-1.745, 1.705, -0.843],
            boundingBox: [-4.5, 0.5, -5],
            size: [9, 1, 8]
        },
    ]
}