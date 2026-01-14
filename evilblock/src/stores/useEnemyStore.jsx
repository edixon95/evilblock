import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useEnemyStore = create((set, get) => ({
    enemies: extractFromLevelTable("enemies"),

    resetEnemies: (level, room) => {
        set((state) => {
            const floor = state.enemies[level];
            if (!floor) return {};

            const roomEnemies = floor[room];
            if (!roomEnemies) return {};
            roomEnemies.forEach(enemy => {
                delete enemy.controller;
                delete enemy._upperRef;
                delete enemy._lowerRef;
                delete enemy.seesPlayer;
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
    },

    damageEnemy: (target, damage, level, room) => {
        if (!target || !target.userData?.id) return;
        set((state) => {
            const id = target.userData.id;
            let updatedEnemies = { ...state.enemies };

            const levelsToCheck = level ? [level] : Object.keys(state.enemies);

            levelsToCheck.forEach(lvl => {
                const floor = state.enemies[lvl];
                if (!floor) return;

                const roomsToCheck = room ? [room] : Object.keys(floor);

                roomsToCheck.forEach(rm => {
                    const roomEnemies = floor[rm];
                    if (!roomEnemies) return;

                    roomEnemies.forEach(enemy => {
                        if (enemy.id === id) {
                            if (enemy.health === undefined) enemy.health = enemy.maxHealth || 100;

                            enemy.health -= damage;

                            if (enemy.health <= 0) {
                                enemy.isAlive = false;
                            }
                        }
                    });

                    updatedEnemies[lvl] = {
                        ...floor,
                        [rm]: roomEnemies
                    };
                });
            });

            return { enemies: updatedEnemies };
        });
    }
}));

