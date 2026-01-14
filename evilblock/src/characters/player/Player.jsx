import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { canMove } from "../../helpers/canMove";
import { tryInteract } from "./tryInteract";
import { updateSounds } from "../../sound/SoundSystem";
import { useGameStore } from "../../stores/useGameStore";

import { initPlayerController } from "./controller";
import { getPlayerInput } from "./input";
import { updatePlayer } from "./updatePlayer";
import { useInventoryStore } from "../../stores/useInventoryStore";

export const Player = ({ playerRef }) => {
  const [, forceRender] = useState(false);

  const game = useGameStore.getState().gameState.game

  useEffect(() => {
    window.keys = {};
    const handleDown = (e) => (window.keys[e.code] = true);
    const handleUp = (e) => (window.keys[e.code] = false);

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!playerRef.current) return;

    if (!playerRef.current.controller) {
      playerRef.current.controller = { ...initPlayerController };
    }


    updateSounds(delta);

    const ctx = {
      ref: playerRef,
      ctrl: playerRef.current.controller,
      delta,
      input: getPlayerInput(),
      canMove,
      tryInteract,
      menuActive: useGameStore.getState().gameState.menu.active || useGameStore.getState().gameState.data !== null,
      weaponInfo: useInventoryStore.getState().getEquippedInformation()?.data,
      location: { level: game.level, room: game.room }
    };

    updatePlayer(ctx);

    playerRef.current.focusedEnemy =
      playerRef.current.controller?.focusedEnemy || null;

    playerRef.current.aimStability =
      playerRef.current.controller?.aimStability || 0;


    forceRender(v => !v);
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

      <mesh position={[0, 0, -0.6]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial
          color={playerRef.current?.controller?.aiming ? "red" : "yellow"}
        />
      </mesh>
    </mesh>
  );
};
