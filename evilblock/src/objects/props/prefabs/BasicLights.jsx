import * as THREE from 'three'
import { forwardRef, useRef } from 'react'

const glowMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#ffffff',
    emissiveIntensity: 2,
})

const devMaterial = new THREE.MeshBasicMaterial({
    color: '#00ffff',
    wireframe: true,
})

export const StreetLight = forwardRef(({ prop }, ref) => {
    const { position = [0, 0, 0], height = 5, intensity = 25, isDev = false, rotation = 1 } = prop;
    const lightRef = useRef();
    const targetRef = useRef();
    const bulbPos = [0.6, height - 2, 0];
    const rotationY =
        rotation === 2
            ? Math.PI / 2
            : rotation === 3
                ? Math.PI
                : rotation === 4
                    ? (3 * Math.PI) / 2
                    : 0;

    return (
        <group ref={ref} position={position} rotation={[0, rotationY, 0]}>
            <mesh position={[0, height / 2, 0]}>
                <cylinderGeometry args={[0.08, 0.1, height, 16]} />
                <meshStandardMaterial color="#444" />
            </mesh>

            <mesh position={[0.6, height - 0.2, 0]} material={glowMaterial}>
                <boxGeometry args={[0.6, 0.2, 0.4]} />
            </mesh>

            <spotLight
                ref={lightRef}
                position={bulbPos}
                intensity={intensity}
                angle={0.6}
                penumbra={0.4}
                castShadow
                target={targetRef.current}
            />

            <object3D ref={targetRef} position={[0.6, 0, 0]} />

            {isDev && (
                <mesh position={bulbPos} rotation={[0, 0, 0]} material={devMaterial}>
                    <coneGeometry args={[2, 4, 16, 1, true]} />
                </mesh>
            )}
        </group>
    );
});

export const DeskLamp = forwardRef(({ prop }, ref) => {
    const {
        position = [0, 0, 0],
        height = 1,
        intensity = 2,
        isDev = false,
    } = prop

    return (
        <group ref={ref} position={position}>
            <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.25, 0.25, 0.1, 16]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            <mesh position={[0, height / 2, 0]}>
                <cylinderGeometry args={[0.05, 0.05, height, 12]} />
                <meshStandardMaterial color="#555" />
            </mesh>

            <mesh position={[0, height, 0]} material={glowMaterial}>
                <coneGeometry args={[0.25, 0.3, 16]} />
            </mesh>

            <pointLight position={[0, height, 0]} intensity={intensity} distance={5} />

            {isDev && (
                <mesh position={[0, height, 0]} material={devMaterial}>
                    <sphereGeometry args={[1, 12, 12]} />
                </mesh>
            )}
        </group>
    )
})
export const CeilingLight = forwardRef(({ prop }, ref) => {
    const {
        position = [0, 0, 0],
        height = 3,
        intensity = 2,
        isDev = false,
    } = prop

    return (
        <group ref={ref} position={position}>
            <mesh position={[0, height, 0]} material={glowMaterial}>
                <sphereGeometry args={[0.15, 16, 16]} />
            </mesh>
            <pointLight position={[0, height, 0]} intensity={intensity} distance={6} />

            {isDev && (
                <mesh position={[0, height, 0]} material={devMaterial}>
                    <sphereGeometry args={[1.5, 12, 12]} />
                </mesh>
            )}
        </group>
    )
})
export const FluorescentLight = forwardRef(({ prop }, ref) => {
    const {
        position = [0, 0, 0],
        height = 3,
        length = 2,
        intensity = 6,
        isDev = false,
    } = prop

    return (
        <group ref={ref} position={position}>
            <mesh position={[0, height, 0]} material={glowMaterial}>
                <boxGeometry args={[length, 0.08, 0.08]} />
            </mesh>

            <rectAreaLight
                position={[0, height - 0.05, 0]}
                width={length}
                height={0.3}
                intensity={intensity}
                rotation={[-Math.PI / 2, 0, 0]}
            />

            {isDev && (
                <mesh
                    position={[0, height - 0.05, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    material={devMaterial}
                >
                    <planeGeometry args={[length, 0.3]} />
                </mesh>
            )}
        </group>
    )
})
