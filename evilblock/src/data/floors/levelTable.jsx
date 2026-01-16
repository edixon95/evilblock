import { getDoorInfo } from "../doors/doorTable";
import { floor_00 } from "./level/floor_00";
import { floor_01 } from "./level/floor_01";
import { floor_02 } from "./level/floor_02";

export const LEVEL_TABLE = {
    floor_00,
    floor_01,
    floor_02
}

export const getDoorData = (floor, room, id) => {
    return LEVEL_TABLE[floor][room].doors.find((x) => x.id === id)
}

export const extractFromLevelTable = (targetKey) => {
    const finalResult = {};

    for (const floorName in LEVEL_TABLE) {
        finalResult[floorName] = {};

        for (const roomName in LEVEL_TABLE[floorName]) {
            const room = LEVEL_TABLE[floorName][roomName];

            let extractedArray = room[targetKey] || [];

            // add

            if (targetKey === "doors") {
                extractedArray = extractedArray.map(door => {
                    const extra = getDoorInfo(door.id);
                    return extra
                        ? { ...door, extra }
                        : door;
                });
            }

            finalResult[floorName][roomName] = extractedArray;
        }
    }

    return finalResult;
};
