import { useRef } from 'react'

import { Canvas } from "@react-three/fiber";

import "./index.css"
import { Experience } from './Experience';

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
    </div>
  )
}

export default App
