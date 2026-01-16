import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

export const CameraSystem = ({ cameras, region }) => {
    const { camera } = useThree()

    useEffect(() => {
        if (!region) return

        const cam = cameras.find((x) => x.id === region)
        if (!cam) return

        camera.position.set(...cam.position)
        camera.lookAt(...cam.lookAt)
        camera.updateMatrixWorld()
    }, [region, camera])

    return null
}