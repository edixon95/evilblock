import { useRef } from 'react'

import { Canvas } from "@react-three/fiber";
import { Experience } from './Experience';

import { useGameStore } from "./stores/useGameStore"

import "./index.css"
import { LEVEL_TABLE } from './data/floors/levelTable';
function App() {
  const playerRef = useRef()
  const testFunc = () => {
    useGameStore.getState().handleChangeMode("cutscene")
  }
  console.log(LEVEL_TABLE)
  return (
    <div className="fullscreen-canvas">
      <Canvas
        camera={{ fov: 75 }}
        shadows
      // frameloop={isDevCam ? "always" : pauseGame ? "demand" : "always"}
      >
        <Experience playerRef={playerRef} />
      </Canvas>
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
