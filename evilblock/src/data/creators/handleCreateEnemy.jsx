import { BASIC } from "../../constants/enemyConstants"
import { ENEMY_TYPES } from "../enemy/enemyTypes"

export const handleCreateEnemy = (position = [0, 0, 0], type = BASIC, id) => {
    return (
        {
            id,
            position: position,
            type: type,
            ...ENEMY_TYPES[type],
            isAlive: true
        }
    )
}