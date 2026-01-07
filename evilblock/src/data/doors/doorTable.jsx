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
        to: {
            level: FLOOR_02,
            room: ROOM_02,
            door: DOOR_02,
        },
        lock: {
            type: 0,
            isLocked: true
        },
        cutscene: null
    },
    door_02: {
        to: {
            level: FLOOR_01,
            room: ROOM_01,
            door: DOOR_01,
        },
        lock: {
            type: 0,
            isLocked: false
        },
        cutscene: null
    }
}

export const getDoorInfo = (id) => {
    return DOOR_TABLE[id]
}