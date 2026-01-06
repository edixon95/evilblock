import { PointerLockControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const DevCam = () => {
    const controls = useRef();
    const { camera } = useThree();

    const speed = 10;

    const keys = useRef({
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        o: false,
        p: false,
    });

    // Start high up looking down
    useEffect(() => {
        camera.position.set(0, 50, 0); // X, Y, Z
        camera.lookAt(0, 0, 0);
    }, [camera]);

    useEffect(() => {
        const onKeyDown = (e) => {
            if (keys.current.hasOwnProperty(e.key)) {
                keys.current[e.key] = true;
            }

            if (e.code === "Space") {
                const camPos = new THREE.Vector3();
                camera.getWorldPosition(camPos);

                const dir = new THREE.Vector3();
                camera.getWorldDirection(dir);

                const lookAt = camPos.clone().add(dir);

                const pos = [
                    Math.round(camPos.x * 1000) / 1000,
                    Math.round(camPos.y * 1000) / 1000,
                    Math.round(camPos.z * 1000) / 1000
                ];

                const target = [
                    Math.round(lookAt.x * 1000) / 1000,
                    Math.round(lookAt.y * 1000) / 1000,
                    Math.round(lookAt.z * 1000) / 1000
                ];

                console.log("position:", pos);
                console.log("lookAt:", target);
            }
        };

        const onKeyUp = (e) => {
            if (keys.current.hasOwnProperty(e.key)) {
                keys.current[e.key] = false;
            }
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        };
    }, [camera]);

    useFrame((_, delta) => {
        if (!controls.current?.isLocked) return;

        const velocity = speed * delta;

        if (keys.current.ArrowUp) controls.current.moveForward(velocity);
        if (keys.current.ArrowDown) controls.current.moveForward(-velocity);
        if (keys.current.ArrowLeft) controls.current.moveRight(-velocity);
        if (keys.current.ArrowRight) controls.current.moveRight(velocity);

        if (keys.current.o) camera.position.y += velocity;
        if (keys.current.p) camera.position.y -= velocity;
    });

    return <PointerLockControls ref={controls} />;
};
