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
import { EnemyTarget } from "./ui/ui3d/EnemyTarget"
import { useCameraStore } from "./stores/useCameraStore"
import { CameraManager } from "./managers/CameraManager"
import { ActionManager } from "./managers/ActionManager"
import { useFrame, useThree } from "@react-three/fiber"
import { useAdminStore } from "./stores/useAdminStore"

export const Experience = ({ playerRef }) => {
    const { level, room, region } = useGameStore((state) => state.gameState.game)
    const allWorlds = useWorldStore((state) => state?.world)
    const allDoors = useDoorStore((state) => state?.doors)
    const allEnemies = useEnemyStore((state) => state?.enemies)
    const allProps = usePropStore((state) => state?.props)
    const allCameras = useCameraStore((state) => state?.cameras)
    const fade = useGameStore((state) => state.gameState.fade)

    const allItems = useItemStore((state) => state?.items)

    const floors = allWorlds[level][room]
    const props = allProps[level][room]
    const doors = allDoors[level][room]
    const enemies = allEnemies[level][room]
    const cameras = allCameras[level][room]


    const items = allItems[level][room]
    const interacts = [...items]

    const shouldRender = (array) => {
        return array && array.length > 0
    }

    const { shake, fog, moody, isDev } = useAdminStore((state) => state?.adminState)

    const { camera } = useThree();
    useFrame(() => {
        if (shake) {
            // subtle PSX-style camera jitter
            camera.position.x += (Math.random() - 0.5) * 0.0025;
            camera.position.y += (Math.random() - 0.5) * 0.0025;
        }
    });

    return (
        <>
            {isDev && <DevCam />}
            <ambientLight intensity={isDev ? 1.2 : 0.3} color={isDev ? "#ffffff" : moody ? "#4056b8" : "#ffffff"} />
            <spotLight
                color={"#ffffff"}
                intensity={5}
                position={[5, 2, 10]}
                angle={4.5}
                penumbra={0.2}
            />

            <spotLight
                color={"#ffffff"}
                intensity={8}
                position={[-12, 4.5, -2.5]}
                angle={3}
                penumbra={0.2}
            />

            {fog &&
                <fog attach="fog" args={["#086357", -5, 20]} />
            }
            <Player playerRef={playerRef} />
            <EnemyTarget playerRef={playerRef} />
            {isDev &&
                <SoundSpheres />
            }
            <ActionManager playerRef={playerRef} />

            {shouldRender(cameras) &&
                <CameraManager playerRef={playerRef} cameras={cameras} region={region} isDev={isDev} />
            }

            {!fade &&
                <>
                    {shouldRender(floors) &&
                        <>
                            <FloorManager floors={floors} />
                            <WallManager floors={floors} />
                        </>
                    }


                    {shouldRender(props) &&
                        <PropManager props={props} />
                    }

                    {shouldRender(enemies) && shouldRender(floors) &&
                        <EnemyManager key={`${level}-${room}`} enemies={enemies} floors={floors} playerRef={playerRef} />
                    }

                    {shouldRender(doors) &&
                        <DoorManager doors={doors} />
                    }

                    {shouldRender(interacts) &&
                        <InteractManager items={interacts} />
                    }
                </>
            }


        </>
    )
}