import { useGameStore } from "../../stores/useGameStore";
import { handlePromptSelect } from "./handlePromptSelect";

/*
TODO: Hookup keyboard controls
TODO: Add handler for types 
Types: 
    Prompt: Just requires the player to press confirm to trigger the intended action
    Item: Very similar to a prompt but will insert an item into the players inventory
    Puzzle+Key: change data.type to and force the inventory screen open, already selected on the inventory window
    Override controls that the usual F will close the menu instead of going back to the top bar
*/

export const IngamePromptMenu = () => {
    const data = useGameStore((state) => state.gameState?.data);

    if (!data || data?.type !== "PROMPT") return;
    const { options, text } = data.prompt

    const handlePrompt = (fn) => {
        if (fn === "confirm") {
            handlePromptSelect(data)
        } else {
            useGameStore.getState().handleClearData()
        }

    }

    return (
        <div
            style={{
                position: "absolute",
                width: "100%",
                bottom: 0,
                left: 0,
                backgroundColor: "red",
                height: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div
                style={{
                    height: "80%",
                    width: "50%",
                    backgroundColor: "green",
                    display: "flex",
                    justifyContent: "space-between",
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "stretch",
                        flexDirection: "column",
                        fontSize: 33,
                        backgroundColor: "orange",
                        width: "80%",
                        padding: 25,
                        boxSizing: "border-box"
                    }}
                >
                    {text}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "stretch",
                        backgroundColor: "yellow",
                        flexDirection: "column",
                        gap: "25%",
                        fontSize: 33
                    }}
                >
                    {options && options.length > 0 &&
                        options.map((op, i) => {
                            return (
                                <div key={`option-${i}`}
                                    onClick={() => handlePrompt(op.function)}
                                >{op.optionText}</div>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}