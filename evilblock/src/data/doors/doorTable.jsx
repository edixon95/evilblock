import {
    FLOOR_01,
    FLOOR_02,

    ROOM_01,
    ROOM_02,

    DOOR_01,
    DOOR_02,
} from "../../constants/floorConstants";

// TODO: Seperate into floors like the levels
export const DOOR_TABLE = {
    [DOOR_01]: {
        to: {
            level: FLOOR_02,
            room: ROOM_02,
            door: DOOR_02,
        },
        lock: {
            type: 0,
            isLocked: false
        },
        cutscene: "cutscene_01"
    },
    [DOOR_02]: {
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