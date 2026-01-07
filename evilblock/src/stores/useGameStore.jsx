import { create } from "zustand"
import { FLOOR_01, ROOM_01 } from "../constants/floorConstants"

export const useGameStore = create((set, get) => ({
    gameState: {
        mode: "game", // game || cutscene
        fade: false,
        game: {
            character: "Ben Lock",
            difficulty: 1,
            level: FLOOR_01,
            room: ROOM_01
        },
        cutscene: null,
        menu: {
            active: false,
            menuType: null,
        },
        data: null
    },

    // Cutscene mode will disable player rendering
    handleChangeMode: (mode) => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                mode
            }
        }))
    },
    // Triggers the fade screen to hide stuff
    handleChangeFade: (fade) => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                fade
            }
        }))
    },
    // Difficulty and character are different menu options, split for simplicity.
    handleChangeCharacter: (character) => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                game: {
                    ...state.gameState.game,
                    character
                }
            }
        }))
    },
    handleChangeDifficulty: (difficulty) => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                game: {
                    ...state.gameState.game,
                    difficulty
                }
            }
        }))
    },
    // A new level (floor) will always mean a new room.  A cutscene will also have the ability to do this, as well as handleChangeRoom
    handleChangeLevel: (level, room) => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                game: {
                    ...state.gameState.game,
                    level,
                    room
                }
            }
        }))
    },
    // Door -> Door changes room.
    handleChangeRoom: (room) => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                game: {
                    ...state.gameState.game,
                    room
                }
            }
        }))
    },
    // Called in conjunction with handleChangeMode, may need to exist as combo
    handleChangeCutscene: (id) => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                mode: "cutscene",
                cutscene: id
            }
        }))
    },
    handleCloseCutscene: () => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                mode: "game",
                cutscene: null
            }
        }))
    },
    /*
        Menu states:
        active: This will cause the rendering to pause
        menuType: What menu is actually displayed on the screen
        data: Any data that may need to be held onto for the menu
    */
    handleOpenMenu: (menuType, data) => {
        set((state) => {
            const newState = {
                ...state.gameState,
                menu: {
                    ...state.gameState.menu,
                    active: true,
                    menuType
                }
            }

            if (data !== undefined) {
                newState.data = data
            }

            return { gameState: newState }
        })
    },
    handleChangeMenuType: (menuType) => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                menu: {
                    ...state.gameState.menu,
                    menuType
                }
            }
        }))
    },
    handleCloseMenu: (persistData = false) => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                menu: {
                    ...state.gameState.menu,
                    active: false,
                    menuType: null
                },
                data: persistData ? state.gameState.data : null
            }
        }))
    },
    handleAddData: (data) => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                data
            }
        }))
    },
    handleClearData: () => {
        set((state) => ({
            gameState: {
                ...state.gameState,
                data: null
            }
        }))
    },
}))


