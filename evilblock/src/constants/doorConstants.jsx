export const DOOR = "DOOR"
export const STAIR = "STAIR"
export const UP = "UP"
export const DOWN = "DOWN"

export const DOOR_SIZES_TABLE = {
    DOOR: [1, 2, 0.3],
    STAIR: [2, 2, 3]
}

export const DOOR_HEIGHT_TABLE = {
    DOOR: 1,
    STAIR: {
        UP: 0,
        DOWN: -2
    }
}