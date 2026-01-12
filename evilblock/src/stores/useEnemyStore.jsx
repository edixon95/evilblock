import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useEnemyStore = create((set, get) => ({
    enemies: extractFromLevelTable("enemies"),

    resetEnemies: (level, room) => {
        console.log(level, room)
        set((state) => {
            const floor = state.enemies[level];
            if (!floor) return {};

            const roomEnemies = floor[room];
            if (!roomEnemies) return {};
            roomEnemies.forEach(enemy => {
                delete enemy.controller;
                delete enemy._initialized;

                if (enemy._despawnPos) {
                    enemy.position = [enemy._despawnPos.x, enemy._despawnPos.y, enemy._despawnPos.z];
                    delete enemy._despawnPos;
                }

                if (enemy._despawnRotation) {
                    enemy.rotation = enemy._despawnRotation;
                    delete enemy._despawnRotation;
                }
            });
            return {
                enemies: {
                    ...state.enemies,
                    [level]: {
                        ...floor,
                        [room]: roomEnemies
                    }
                }
            };
        });
    }
}));

