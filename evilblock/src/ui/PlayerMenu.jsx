import { useGameStore } from "../stores/useGameStore"
import { PlayerMenuMenuOption } from "./playerMenuComponents/PlayerMenuMenuOption";

export const PlayerMenu = () => {

    const gameState = useGameStore((state) => state.gameState)
    if (!gameState.menu.active)
        return;


    return (
        <div style={{
            backgroundColor: 'red',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxSizing: 'border-box',
            paddingLeft: 10,
            paddingRight: 10,
            gap: "1%"
        }}>
            <div
                style={{
                    backgroundColor: "orange",
                    width: "100%",
                    height: "18%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                <div
                    style={{ width: "49.5%", height: "100%", backgroundColor: "yellow" }}
                >
                    Player information
                </div>
                <div
                    style={{ width: "49.5%", height: "100%", backgroundColor: "green" }}
                >
                    <PlayerMenuMenuOption />
                </div>
            </div>
            <div
                style={{
                    backgroundColor: "green",
                    width: "100%",
                    height: "78%"
                }}
            >
                Actual Inventory
            </div>
        </div>
    )
}