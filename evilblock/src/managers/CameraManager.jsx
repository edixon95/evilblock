import { CameraSystem } from "../cameras/CameraSystem";
import { RegionTrigger } from "../cameras/RegionTrigger";

export const CameraManager = ({ playerRef, cameras, region, isDev }) => {

    return (
        <>
            {!isDev &&
                <CameraSystem
                    cameras={cameras}
                    region={region}
                />
            }

            {cameras.map((cam) => (
                <RegionTrigger
                    key={cam.id}
                    playerRef={playerRef}
                    id={cam.id}
                    position={cam.boundingBox}
                    size={cam.size}
                />
            ))}

        </>
    )
}