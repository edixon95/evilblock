import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useGameStore } from "../stores/useGameStore"
import { propMeshes } from "./PropManager"
import { usePropStore } from "../stores/usePropStore"

const EPSILON = 0.01

export const ActionManager = ({ playerRef }) => {
    const action = useGameStore((state) => state?.gameState?.action)

    const actionRef = useRef(null) // ✅ NEW
    const startedRef = useRef(false)
    const targetObjectRef = useRef(null);
    const targetIdRef = useRef(null)
    const SPEED = useRef(null)
    const targetPosRef = useRef(new THREE.Vector3())
    const toTargetRef = useRef(new THREE.Vector3())

    useEffect(() => {
        const act = action?.action
        if (!act || act.isComplete || act.type !== "MOVE") return
        if (startedRef.current) return

        const [targetId] = act.target.filter(t => t !== "PLAYER")
        if (!targetId) return
        targetIdRef.current = targetId
        const targetRef = propMeshes.find(
            (ref) => ref.current?.userData?.id === targetId
        )

        if (!targetRef?.current || !playerRef.current) return

        actionRef.current = act
        useGameStore.getState().handleClearData()
        targetObjectRef.current = targetRef.current
        targetPosRef.current.set(...act.position)
        SPEED.current = act.speed ?? 2
        startedRef.current = true

    }, [action?.action, playerRef])

    useFrame((_, delta) => {
        if (!startedRef.current) return

        const targetObject = targetObjectRef.current
        const player = playerRef.current
        const act = actionRef.current

        if (!targetObject || !player || !act) return

        toTargetRef.current.subVectors(
            targetPosRef.current,
            targetObject.position
        )

        const distance = toTargetRef.current.length()

        // Finish
        if (distance < EPSILON) {
            targetObject.position.copy(targetPosRef.current)
            startedRef.current = false

            const { level, room } = useGameStore.getState().gameState.game
            usePropStore.getState().markPropActionComplete(level, room, targetIdRef.current)
            usePropStore.getState().updatePropLocation(level, room, targetIdRef.current, act.position)

            useGameStore.getState().handlClearAction()

            actionRef.current = null
            targetIdRef.current = null
            SPEED.current = 2

            return
        }

        const step = Math.min(SPEED.current * delta, distance)
        toTargetRef.current.normalize().multiplyScalar(step)

        targetObject.position.add(toTargetRef.current)
        player.position.add(toTargetRef.current)
    })

    return null
}
