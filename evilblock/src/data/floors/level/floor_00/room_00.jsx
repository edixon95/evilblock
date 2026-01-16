import { DOOR, STAIR, UP } from "../../../../constants/doorConstants";
import { DOOR_00 } from "../../../../constants/floorConstants";
import { handleCreatePrompt } from "../../../../tool/handleCreatePrompt";

import { handleCreateDoor } from "../../../creators/handleCreateDoor";
import { handleCreateGeometry } from "../../../creators/handleCreateGeometry";
import { handleCreateProp } from "../../../creators/handleCreateProp";

export const room_00 = {
    geometry: [
        handleCreateGeometry([-2.5, 0, 1.5], [20, 5]),
        handleCreateGeometry([-8, 0, -2.5], [9, 3]),
        handleCreateGeometry([3.5, 0, -3.5], [8, 5]),
        // handleCreateGeometry([-10, 0, 2], [10, 4]),
        handleCreateGeometry([5, 0, 8], [5, 8])
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
    cameras: []
}