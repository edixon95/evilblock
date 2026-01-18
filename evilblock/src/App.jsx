import { useRef } from 'react'

import { Canvas } from "@react-three/fiber";
import { Experience } from './Experience';

import "./index.css"
import { TransitionManager } from './managers/TransitionManager';
import { PlayerMenu } from './ui/PlayerMenu';
import { IngamePromptMenu } from './ui/promptWindow/IngamePromptMenu';
import { useGameStore } from './stores/useGameStore';
import { MaterialProvider } from './data/materials/MaterialProvider';

import { EffectComposer, Pixelation, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { Vector2 } from 'three';
import { AdminPanel } from './tool/AdminPanel';
import { useAdminStore } from './stores/useAdminStore';
function App() {
  const playerRef = useRef()

  const gameState = useGameStore((state) => state.gameState)
  const shouldPause = gameState.data !== null || gameState.fade || gameState.menu.active

  const { pixel, chromatic } = useAdminStore((state) => state?.adminState)

  return (
    <div className="fullscreen-canvas">
      <Canvas
        camera={{ fov: 75 }}
        shadows
        frameloop={shouldPause ? "demand" : "always"}
      >
        <MaterialProvider />
        <Experience playerRef={playerRef} />
        <EffectComposer>
          {pixel &&
            <Pixelation granularity={6} />
          }
          {chromatic &&
            <ChromaticAberration offset={new Vector2(0.0025, 0.0025)} />
          }
        </EffectComposer>

      </Canvas>
      <TransitionManager playerRef={playerRef} />
      <IngamePromptMenu />
      <PlayerMenu />
      <AdminPanel />
    </div>
  )
}

export default App
