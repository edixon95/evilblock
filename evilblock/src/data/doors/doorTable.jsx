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
        level: FLOOR_02,
        room: ROOM_02,
        door: DOOR_02
    },
    door_02: {
        level: FLOOR_01,
        room: ROOM_01,
        door: DOOR_01
    }
}

export const getDoorInfo = (id) => {
    return DOOR_TABLE[id]
}