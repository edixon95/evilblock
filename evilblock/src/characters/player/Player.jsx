import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { canMove } from "../../helpers/canMove";
import { tryInteract } from "./tryInteract";
import { useGameStore } from "../../stores/useGameStore";
import { emitSound, updateSounds } from "../../sound/SoundSystem";

export const Player = ({ playerRef }) => {
  const aimingRef = useRef(false);
  const prevAimKeyRef = useRef(false);
  const prevSpaceKeyRef = useRef(false);
  const prevTabKeyRef = useRef(false);
  const menuOpenRef = { current: false }

  const moveSoundTimerRef = useRef(0);

  const WALK_SOUND_DELAY = 0.5;
  const WALK_SOUND_LEVEL = 2;
  const RUN_SOUND_LEVEL = 4;

  const isPlayerMenuActive = useGameStore((state) => state.gameState.menu.active)



  const [aiming, setAiming] = useState(false);

  useEffect(() => {
    window.keys = {};
    const handleKeyDown = (e) => (window.keys[e.code] = true);
    const handleKeyUp = (e) => (window.keys[e.code] = false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const direction = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!playerRef?.current) return;



    const tabPressed = !!window.keys["KeyE"];

    if (tabPressed && !prevTabKeyRef.current) {
      if (!isPlayerMenuActive) {
        useGameStore.getState().handleOpenMenu("pause")
      }

      menuOpenRef.current = !menuOpenRef.current
    }

    prevTabKeyRef.current = tabPressed;

    /* Menu only activates from here, can't turn it off. 
      Handle the key press first so there's no overlap.
      Update sounds so that they're dealt with after unpausing. */
    if (isPlayerMenuActive) return;
    updateSounds(delta)

    // SPACE ACTION
    const spacePressed = !!window.keys["Space"];

    if (aimingRef.current) {
      if (spacePressed) {
        // Shooting
        console.log("Player shooting")
      }
    } else {
      if (spacePressed && !prevSpaceKeyRef.current) {
        // Player interact
        tryInteract(playerRef.current)
      }
    }

    prevSpaceKeyRef.current = spacePressed;

    // MOVEMENT
    const rotationSpeed = 2;
    let speed = 2;

    if (window.keys["ShiftLeft"] && !window.keys["KeyS"]) {
      speed = 3;
    }

    const moveDistance = speed * delta;

    let rotationMultiplier = 1;
    if (window.keys["KeyS"] && !aimingRef.current) {
      rotationMultiplier = -1;
    }

    if (window.keys["KeyA"]) {
      playerRef.current.rotation.y +=
        rotationSpeed * delta * rotationMultiplier;
    }

    if (window.keys["KeyD"]) {
      playerRef.current.rotation.y -=
        rotationSpeed * delta * rotationMultiplier;
    }

    // AIM TOGGLE
    const aimKeyPressed = !!window.keys["KeyQ"];

    if (aimKeyPressed && !prevAimKeyRef.current) {
      aimingRef.current = !aimingRef.current;
      setAiming(aimingRef.current);
    }

    prevAimKeyRef.current = aimKeyPressed;

    // MOVEMENT (NO MOVE WHILE AIMING)
    let isMoving = false;

    if (!aimingRef.current) {
      if (window.keys["KeyW"] || window.keys["KeyS"]) {
        isMoving = true;
      }
    }

    if (isMoving) {
      moveSoundTimerRef.current += delta;

      if (moveSoundTimerRef.current >= WALK_SOUND_DELAY) {
        const isRunning = window.keys["ShiftLeft"];
        emitSound(
          playerRef.current.position,
          isRunning ? RUN_SOUND_LEVEL : WALK_SOUND_LEVEL,
          0.15
        );
        moveSoundTimerRef.current = 0;
      }
    } else {
      moveSoundTimerRef.current = 0;
    }


    // TODO: replace with move function

    if (!aimingRef.current) {
      direction.current.set(0, 0, -1);
      if (window.keys["KeyW"]) {
        if (
          canMove(
            playerRef.current.position,
            playerRef.current.rotation,
            direction.current,
            moveDistance
          )
        ) {
          playerRef.current.translateZ(-moveDistance);
        }
      }

      direction.current.set(0, 0, 1);
      if (window.keys["KeyS"]) {
        if (
          canMove(
            playerRef.current.position,
            playerRef.current.rotation,
            direction.current,
            moveDistance
          )
        ) {
          playerRef.current.translateZ(moveDistance);
        }
      }
    }
  });

  return (
    <mesh
      ref={playerRef}
      position={[6, 0.5, 7]}
      rotation={[0, Math.PI / 2, 0]}
      castShadow
    >
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="red" />

      {/* Aim Indicator */}
      <mesh position={[0, 0, -0.6]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial
          color={aiming ? "red" : "yellow"}
        />
      </mesh>
    </mesh>
  );
};
