import { useState, useEffect, useRef } from "react";
import { useGameStore } from "../../stores/useGameStore";
import { handlePromptSelect } from "./handlePromptSelect";
import "../css/ingamePromptMenu.css";

export const IngamePromptMenu = () => {
    const data = useGameStore((state) => state.gameState?.data);
    const { options = [], text = "" } = data?.prompt ?? {};

    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [canAcceptInput, setCanAcceptInput] = useState(false);

    const optionCount = options.length;
    const TYPING_SPEED = 60;
    const POST_TYPE_DELAY = 500;

    const typingIntervalRef = useRef(null);
    const typingIndexRef = useRef(0);

    //tickytacky
    useEffect(() => {
        if (!text || data?.type !== "PROMPT") {
            setDisplayedText("");
            setIsTyping(true);
            setIndex(0);
            typingIndexRef.current = 0;

            return;
        }

        setDisplayedText("");
        setIsTyping(true);
        setCanAcceptInput(false);
        setIndex(0);

        typingIndexRef.current = 0;

        typingIntervalRef.current = setInterval(() => {
            setDisplayedText((prev) => prev + text[typingIndexRef.current]);
            typingIndexRef.current++;

            if (typingIndexRef.current >= text.length) {
                finishTyping();
            }
        }, TYPING_SPEED);

        return () => clearInterval(typingIntervalRef.current);
    }, [text, data?.type]);

    const finishTyping = () => {
        clearInterval(typingIntervalRef.current);
        setDisplayedText(text);
        setIsTyping(false);

        // Delay before allowing input to prevent accidental skip/select
        setTimeout(() => {
            setCanAcceptInput(true);
        }, POST_TYPE_DELAY);
    };
    const handlePrompt = (fn) => {
        if (fn === "confirm") {
            handlePromptSelect(data);
        } else {
            useGameStore.getState().handleClearData();
        }
    };

    const handleKeyDown = (e) => {
        if (data?.type !== "PROMPT") return;

        const key = e.key.toLowerCase();

        // Skip typing on F or Space
        if (isTyping && (key === "f" || key === " ")) {
            finishTyping();
            return;
        }

        // Block all input until typing & delay finish
        if (!canAcceptInput) return;

        switch (key) {
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
                handlePrompt(options[index]?.function);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    if (!data || data?.type !== "PROMPT") return null;

    return (
        <div id="ingame-prompt-menu-main">
            <div>
                <div id="ingame-prompt-text" className="menu-text">
                    <span className="ghost-text">{text}</span>
                    <span className="typed-text">{displayedText}</span>
                </div>

                {!isTyping && (
                    <div id="ingame-prompt-options">
                        {options.map((op, i) => (
                            <div
                                key={`option-${i}`}
                                style={{
                                    opacity: i === index ? 1 : 0.5,
                                    fontWeight: i === index ? "bold" : "normal",
                                }}
                                className="menu-text"
                            >
                                {op.optionText}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};