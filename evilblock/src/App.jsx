import { useRef } from 'react'

import { Canvas } from "@react-three/fiber";
import { Experience } from './Experience';

import "./index.css"
import { TransitionManager } from './managers/TransitionManager';
import { PlayerMenu } from './ui/PlayerMenu';
import { IngamePromptMenu } from './ui/promptWindow/IngamePromptMenu';
import { useGameStore } from './stores/useGameStore';
import { MaterialProvider } from './data/materials/MaterialProvider';
function App() {
  const playerRef = useRef()

  const gameState = useGameStore((state) => state.gameState)
  const shouldPause = gameState.data !== null || gameState.fade || gameState.menu.active

  return (
    <div className="fullscreen-canvas">
      <Canvas
        camera={{ fov: 75 }}
        shadows
        frameloop={shouldPause ? "demand" : "always"}
      >
        <MaterialProvider />
        <Experience playerRef={playerRef} />
      </Canvas>
      <TransitionManager playerRef={playerRef} />
      <IngamePromptMenu />
      <PlayerMenu />
    </div>
  )
}

export default App
