import { floor_01 } from "./level/floor_01";
import { floor_02 } from "./level/floor_02";

export const LEVEL_TABLE = {
    floor_01,
    floor_02
}

export const getDoorData = (floor, room, id) => {
    return LEVEL_TABLE[floor][room].doors.find((x) => x.id === id)
}