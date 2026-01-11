import { useMemo, useRef } from "react"
import { Player } from "./characters/player/Player"
import { FloorManager } from "./managers/FloorManager"
import { WallManager } from "./managers/WallManager"
import { useGameStore } from "./stores/useGameStore"
import { useWorldStore } from "./stores/useWorldStore"
import { useEnemyStore } from "./stores/useEnemyStore"
import { DevCam } from "./tool/DevCam"
import { DoorManager } from "./managers/DoorManager"
import { useDoorStore } from "./stores/useDoorStore"
import { useItemStore } from "./stores/useItemStore"
import { InteractManager } from "./managers/InteractManager"
import { EnemyManager } from "./managers/EnemyManager"
import { usePropStore } from "./stores/usePropStore"
import { PropManager } from "./managers/PropManager"
import { SoundSpheres } from "./sound/SoundSphere"

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
    const allWorlds = useWorldStore((state) => state?.world)
    const allDoors = useDoorStore((state) => state?.doors)
    const allEnemies = useEnemyStore((state) => state?.enemies)
    const allProps = usePropStore((state) => state?.props)

    const allItems = useItemStore((state) => state?.items)

    const floors = allWorlds[level][room]
    const props = allProps[level][room]
    const doors = allDoors[level][room]
    const enemies = allEnemies[level][room]


    const items = allItems[level][room]
    const interacts = [...items]

    const shouldRender = (array) => {
        return array && array.length > 0
    }

    return (
        <>
            <DevCam />
            <ambientLight intensity={1.2} />
            <Player playerRef={playerRef} />
            <SoundSpheres />

            {shouldRender(floors) &&
                <>
                    <FloorManager floors={floors} />
                    <WallManager floors={floors} />
                </>
            }

            {shouldRender(props) &&
                <PropManager props={props} />
            }

            {shouldRender(enemies) && shouldRender(floors) && shouldRender(props) &&
                <EnemyManager enemies={enemies} floors={floors} />
            }

            {shouldRender(doors) &&
                <DoorManager doors={doors} />
            }

            {shouldRender(interacts) &&
                <InteractManager items={interacts} />
            }
        </>
    )
}