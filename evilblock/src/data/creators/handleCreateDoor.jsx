import { DOOR, STAIR, DOOR_HEIGHT_TABLE, DOOR_SIZES_TABLE } from "../../constants/doorConstants"

export const handleCreateDoor = ({ id, type, position, direction = 1, stairDirection = null }) => {
    const height = type === DOOR ? DOOR_HEIGHT_TABLE[DOOR] : DOOR_HEIGHT_TABLE[STAIR][stairDirection]
    return {
        id,
        type,
        position: [position[0], height, position[1]],
        size: DOOR_SIZES_TABLE[type],
        direction,
        stairDirection: stairDirection,
    }
}