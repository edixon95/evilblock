import { useRef } from 'react'

import { Canvas } from "@react-three/fiber";
import { Experience } from './Experience';

import { useGameStore } from "./stores/useGameStore"

import "./index.css"
import { extractFromLevelTable, LEVEL_TABLE } from './data/floors/levelTable';
import { FLOOR_02, ROOM_02 } from './constants/floorConstants';
import { TransitionManager } from './managers/TransitionManager';
function App() {
  const playerRef = useRef()
  const testFunc = () => {
    useGameStore.getState().handleChangeLevel(FLOOR_02, ROOM_02)
  }

  console.log(extractFromLevelTable("doors"))
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
