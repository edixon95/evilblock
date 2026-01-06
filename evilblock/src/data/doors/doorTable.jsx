import {
    FLOOR_01,
    FLOOR_02,

    ROOM_01,
    ROOM_02,

    DOOR_01,
    DOOR_02,
} from "../../constants/floorConstants";

export const DOOR_TABLE = {
    door_01: {
        leadsTo: {
            level: FLOOR_02,
            room: ROOM_02,
            door: DOOR_02
        },
        spawn: {
            position: [-4, 0.5, 4.1],
            rotationY: 4
        }
    },
    door_02: {
        leadsTo: {
            level: FLOOR_01,
            room: ROOM_01,
            door: DOOR_01
        },
        spawn: {
            position: [-2, 1, 7.8],
            rotationY: 4
        }
    }
}