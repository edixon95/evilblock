import { DOOR, STAIR, DOOR_HEIGHT_TABLE, DOOR_SIZES_TABLE } from "../../constants/doorConstants"
import { getDoorInfo } from "../doors/doorTable"

export const handleCreateDoor = ({ id, type, position, direction = 1, isUnlocked = true, stairDirection = null }) => {
    const doorInfo = getDoorInfo(id)
    if (!doorInfo) return [];
    const height = type === DOOR ? DOOR_HEIGHT_TABLE[DOOR] : DOOR_HEIGHT_TABLE[STAIR][stairDirection]
    return {
        id,
        type,
        position: [position[0], height, position[1]],
        size: DOOR_SIZES_TABLE[type],
        direction,
        isUnlocked,
        stairDirection: stairDirection,
        transferData: doorInfo
    }
}