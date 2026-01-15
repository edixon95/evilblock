import { useState, useEffect } from "react";
import { useGameStore } from "../../stores/useGameStore";
import { handlePromptSelect } from "./handlePromptSelect";
import "../css/ingamePromptMenu.css"

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
    const [index, setIndex] = useState(0)

    const { options = [], text = "" } = data?.prompt ?? {};
    const optionCount = options.length;


    const handlePrompt = (fn) => {
        if (fn === "confirm") {
            handlePromptSelect(data)
        } else {
            useGameStore.getState().handleClearData();
        }

    }

    const handleKeyDown = (e) => {
        if (data?.type !== "PROMPT") return;

        switch (e.key.toLowerCase()) {
            case "w":
                setIndex((prev) => (prev - 1 + optionCount) % optionCount);
                break;

            case "s":
                setIndex((prev) => (prev + 1) % optionCount);
                break;

            case "f":
                useGameStore.getState().handleClearData();
                break;

            case " ":
                handlePrompt(options[index].function);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    if (!data || data?.type !== "PROMPT") return;

    return (
        <div id="ingame-prompt-menu-main">
            <div>
                <div id="ingame-prompt-text">
                    {text}
                </div>

                <div id="ingame-prompt-options">
                    {options && options.length > 0 &&
                        options.map((op, i) => {
                            return (
                                <div
                                    key={`option-${i}`}
                                    style={{
                                        opacity: i === index ? 1 : 0.5,
                                        fontWeight: i === index ? "bold" : "normal",
                                    }}
                                >{op.optionText}</div>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}