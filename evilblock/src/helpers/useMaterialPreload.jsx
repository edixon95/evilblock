import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import { useMaterialStore } from '../stores/useMaterialStore'
import { TEXTURE_ARRAY } from '../data/materials/textureArray'

export function useMaterialPreload() {
    const set = useMaterialStore.setState

    // build loader map dynamically
    const textureMap = Object.fromEntries(
        TEXTURE_ARRAY.map((t) => [t.name, t.texture])
    )

    const textures = useTexture(textureMap)

    useEffect(() => {
        set((state) => {
            if (Object.keys(state.materials).length) return state

            const materials = {}

            TEXTURE_ARRAY.forEach((cfg) => {
                const tex = textures[cfg.name]

                // setup
                tex.colorSpace = THREE.SRGBColorSpace
                tex.wrapS = tex.wrapT = cfg.wrap ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping
                if (cfg.wrap)
                    tex.repeat.set(cfg.tiling, cfg.tiling) // same repeat for X/Y

                // original material
                materials[cfg.name] = new THREE.MeshStandardMaterial({
                    map: tex,
                    roughness: 1,
                    metalness: 0,
                })

                // flipped material: same texture, rotate 90° around center
                const flippedMaterial = new THREE.MeshStandardMaterial({
                    map: tex, // reuse the same texture, do not clone
                    roughness: 1,
                    metalness: 0,
                })

                flippedMaterial.map.center.set(0.5, 0.5)
                flippedMaterial.map.rotation = Math.PI / 2 // 90 degrees
                flippedMaterial.map.matrixAutoUpdate = true

                materials[`${cfg.name}_flipped`] = flippedMaterial
            })






            return { materials }
        })
    }, [textures, set])
}
