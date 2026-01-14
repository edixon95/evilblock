import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useDoorStore = create((set, get) => ({
    doors: extractFromLevelTable("doors"),

    handleGetDoorData: (level, room, id) => {
        const { doors } = get()
        return doors[level][room].find((x) => x.id === id)
    },

    handleUnlockDoor: (level, room, id) => {
        set((state) => {
            const updatedRoomDoors = state.doors[level][room].map((door) =>
                door.id === id
                    ? {
                        ...door,
                        extra: {
                            ...door.extra,
                            isSeen: true,
                            lock: {
                                ...door.extra.lock,
                                isLocked: false,
                            },
                        },
                    }
                    : door
            )

            return {
                doors: {
                    ...state.doors,
                    [level]: {
                        ...state.doors[level],
                        [room]: updatedRoomDoors,
                    },
                },
            }
        })
    },

    handeDoorSeen: (level, room, id) => {
        set((state) => {
            const updatedRoomDoors = state.doors[level][room].map((door) =>
                door.id === id
                    ? {
                        ...door,
                        extra: {
                            ...door.extra,
                            isSeen: true,
                        },
                    }
                    : door
            )

            return {
                doors: {
                    ...state.doors,
                    [level]: {
                        ...state.doors[level],
                        [room]: updatedRoomDoors,
                    },
                },
            }
        })
    }


}))
