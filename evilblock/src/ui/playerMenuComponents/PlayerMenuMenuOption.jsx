import { useEffect, useState } from "react";
import { useGameStore } from "../../stores/useGameStore";

import "../css/playerMenuMenuOption.css"

export const PlayerMenuMenuOption = ({ menuOptions, moveSelection, setFocus, focused }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleKeyDown = (e) => {
        if (!focused) return;

        if (e.key.toLowerCase() === "a") {
            const newIndex = Math.max(currentIndex - 1, 0);
            setCurrentIndex(newIndex);
            moveSelection(menuOptions[newIndex]);
        } else if (e.key.toLowerCase() === "d") {
            const newIndex = Math.min(currentIndex + 1, menuOptions.length - 1);
            setCurrentIndex(newIndex);
            moveSelection(menuOptions[newIndex]);
        } else if (e.key === " ") {
            setFocus(true);
        } else if (e.key.toLowerCase() === "f") {
            useGameStore.getState().handleCloseMenu()
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    return (
        <div id="playermenu-menuoption-main">
            {menuOptions.map((op, i) => (
                <div
                    key={op}
                    style={{
                        fontSize: 30,
                        fontWeight: currentIndex === i ? "bold" : "normal",
                        textDecoration: currentIndex === i ? "underline" : "none",
                    }}
                >
                    {op}
                </div>
            ))}
        </div>
    );
};
