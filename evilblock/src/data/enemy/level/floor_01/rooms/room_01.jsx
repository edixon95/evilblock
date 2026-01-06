import { BASIC } from "../../../../enemyConstants"
import { ENEMY_TYPES } from "../../../enemyTypes"

export const room_01 = [
    {
        id: 'basic_zombie_01',
        position: [0, 0, 0],
        type: BASIC,
        ...ENEMY_TYPES[BASIC],
        isAlive: true
    }
]