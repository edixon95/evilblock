import { useRef } from 'react'

import { Canvas } from "@react-three/fiber";
import { Experience } from './Experience';

import "./index.css"
import { TransitionManager } from './managers/TransitionManager';
import { PlayerMenu } from './ui/PlayerMenu';
import { IngamePromptMenu } from './ui/promptWindow/IngamePromptMenu';
function App() {
  const playerRef = useRef()

  return (
    <div className="fullscreen-canvas">
      <Canvas
        camera={{ fov: 75 }}
        shadows
      // frameloop={isDevCam ? "always" : pauseGame ? "demand" : "always"}
      >
        <Experience playerRef={playerRef} />
      </Canvas>
      <TransitionManager playerRef={playerRef} />
      <IngamePromptMenu />
      <PlayerMenu />
    </div>
  )
}

export default App
