import { useEffect, useState } from "react";
import { handleEquipWeapon } from "../actions/handleEquipWeapon";
import { useInventoryStore } from "../../stores/useInventoryStore";
import { useGameStore } from "../../stores/useGameStore";
import { handleUseItemOnTarget } from "../actions/handleUseItemOnTarget";

import "../css/playerMenuInventoryPrompt.css"

export const PlayerMenuInventoryPrompt = ({ item, itemIndex, closePrompt, anchorRef, onSelectCombine }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const gameState = useGameStore((state) => state.gameState);
    const inventoryInteractOptions = [
        { label: "Use" },
        { label: "Examine" }
    ]

    useEffect(() => {
        if (anchorRef) {
            const rect = anchorRef.getBoundingClientRect();
            const parentRect = anchorRef.parentElement.getBoundingClientRect();
            setPosition({
                top: rect.top - parentRect.top,
                left: rect.left - parentRect.left,
            });
        }
    }, [anchorRef]);

    const handleKeyDown = (e) => {
        if (!item) return;

        switch (e.key.toLowerCase()) {
            case "w":
                setSelectedOption((prev) => (prev - 1 + item.options.length) % item.options.length);
                break;
            case "s":
                setSelectedOption((prev) => (prev + 1) % item.options.length);
                break;
            case " ":
                const useOption = gameState.menu.menuType === "pause:inventory" ? inventoryInteractOptions : item.options
                const option = useOption[selectedOption];
                switch (option.label) {
                    case "Equip":
                        handleEquipWeapon(itemIndex)
                        closePrompt();
                        break;
                    case "Use":
                        if (gameState.menu.menuType === "pause:inventory") {
                            handleUseItemOnTarget(item, itemIndex)
                            closePrompt();
                        } else {
                            console.log("Using", item.name);
                            closePrompt();
                        }
                        break;
                    case "Combine":
                        onSelectCombine();
                        break;
                    case "Examine":
                        console.log("Examining", item.name);
                        closePrompt();
                        break;
                }
                break;
            case "f":
                closePrompt();
                break;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    const getPromptText = (label) => {
        const isEquipped = useInventoryStore.getState().isWeaponEquipped(itemIndex)
        if (isEquipped && label === "Equip")
            return "Unequip"

        return label
    }

    return (
        <div
            style={{
                top: position.top,
                left: position.left,
            }}
            id="playermenu-inventory-prompt-main"
        >
            {gameState.menu.menuType !== "pause:inventory" ?
                item.options.map((opt, i) => (
                    <div
                        key={i}
                        style={{
                            fontWeight: selectedOption === i ? "bold" : "normal",
                            textDecoration: selectedOption === i ? "underline" : "none",
                        }}
                    >
                        {getPromptText(opt.label)}
                    </div>
                ))
                :
                inventoryInteractOptions.map((opt, i) => (
                    <div
                        key={i}
                        style={{
                            fontWeight: selectedOption === i ? "bold" : "normal",
                            textDecoration: selectedOption === i ? "underline" : "none",
                        }}
                    >
                        {opt.label}
                    </div>
                ))
            }

        </div>
    );
};
