import { Player } from "./characters/player/Player"
// import { useGameStore } from "./stores/useGameStore"

export const Experience = ({ playerRef }) => {
    // Can see the updates
    // const gameState = useGameStore((state) => state.gameState)
    // This probably safer
    // const mode = useGameStore((state) => state.gameState.mode)
    return (
        <>
            <ambientLight intensity={1.2} />
            <Player playerRef={playerRef} />
        </>
    )
}