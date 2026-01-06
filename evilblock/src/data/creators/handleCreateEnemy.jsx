import { BASIC } from "../../constants/enemyConstants"
import { ENEMY_TYPES } from "../enemy/enemyTypes"

export const handleCreateEnemy = (position = [0, 0, 0], type = BASIC) => {
    return (
        {
            id: 'basic_zombie_01',
            position: position,
            type: type,
            ...ENEMY_TYPES[type],
            isAlive: true
        }
    )
}