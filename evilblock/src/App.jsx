import { useRef } from 'react'

import { Canvas } from "@react-three/fiber";
import { Experience } from './Experience';

import { useGameStore } from "./stores/useGameStore"

import "./index.css"
import { FLOOR_02, ROOM_02 } from './constants/floorConstants';
import { TransitionManager } from './managers/TransitionManager';
import { PlayerMenu } from './ui/PlayerMenu';
function App() {
  const playerRef = useRef()
  const testFunc = () => {
    useGameStore.getState().handleChangeLevel(FLOOR_02, ROOM_02)
  }

  const gameState = useGameStore((state) => state.gameState)

  console.log(gameState)
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
      <PlayerMenu />
      <button style={{
        position: "absolute",
        top: 25,
        left: 25
      }}
        onClick={testFunc}
      >Ah</button>
    </div>
  )
}

export default App
