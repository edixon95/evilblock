import { useMemo, useRef } from "react"
import { Player } from "./characters/player/Player"
import { FloorManager } from "./managers/FloorManager"
import { WallManager } from "./managers/WallManager"
import { useGameStore } from "./stores/useGameStore"
import { useWorldStore } from "./stores/useWorldStore"
import { DevCam } from "./tool/DevCam"
import { countWallSegments } from "./helpers/countWallSegments"
import { DoorManager } from "./managers/DoorManager"

export const Experience = ({ playerRef }) => {
    // Can see the updates
    // const gameState = useGameStore((state) => state.gameState)
    // This probably safer
    // const mode = useGameStore((state) => state.gameState.mode)

    // geometry: [
    //         handleCreateGeometry([4, 0, 0], [10, 4]),
    //         handleCreateGeometry([-3, 0, 3], [4, 10])
    //     ],
    //     props: [],
    //     stations: [],
    //     doors: [
    //         handleCreateDoor({
    //             id: DOOR_02,
    //             type: STAIR,
    //             position: [-2, 5],
    //             direction: 3,
    //             stairDirection: UP
    //         })
    //     ],
    //     enemies: [
    //         handleCreateEnemy([1, 0, 1], BASIC)
    //     ],
    //     items: [],
    //     cameras: []

    const { level, room } = useGameStore((state) => state.gameState.game)
    const world = useWorldStore((state) => state.world)
    const floors = world[level][room].geometry
    const doors = world[level][room].doors

    const shouldRender = (array) => {
        return array && array.length > 0
    }

    return (
        <>
            <DevCam />
            <ambientLight intensity={1.2} />
            <Player playerRef={playerRef} />
            {shouldRender(floors) &&
                <>
                    <FloorManager floors={floors} />
                    <WallManager floors={floors} />
                </>
            }
            {shouldRender(doors) &&
                <DoorManager doors={doors} />
            }
        </>
    )
}