import { useEffect, useState, useRef } from "react";
import { useInventoryStore } from "../../stores/useInventoryStore";
import { PlayerMenuInventoryPrompt } from "./PlayerMenuInventoryPrompt";
import { shouldFade } from "../uiHelper/shouldFade";
import { canCombineItem } from "../uiHelper/canCombineItem";
import { handleCombineItems } from "../actions/handleCombineItems";
import { shouldDisplayEquip } from "../actions/handleEquipWeapon";
import { useGameStore } from "../../stores/useGameStore";

import "../css/playerMenuInventory.css"

export const PlayerMenuInventory = ({ focused, setFocus }) => {
    const inventory = useInventoryStore((state) => state.inventory);
    const gameState = useGameStore((state) => state.gameState);

    const [selection, setSelection] = useState({ row: 0, col: 0 });
    const [promptOpen, setPromptOpen] = useState(false);
    const [combineTarget, setCombineTarget] = useState(null);
    const slotRefs = useRef([]);

    const rows = 3;
    const cols = 4;

    const handleKeyDown = (e) => {
        const index = selection.row * cols + selection.col;
        const currentItem = inventory[index];

        if (!focused) return;

        if (combineTarget !== null) {
            switch (e.key.toLowerCase()) {
                case "w":
                    setSelection((prev) => ({ ...prev, row: (prev.row - 1 + rows) % rows }));
                    break;
                case "s":
                    setSelection((prev) => ({ ...prev, row: (prev.row + 1) % rows }));
                    break;
                case "a":
                    setSelection((prev) => ({ ...prev, col: (prev.col - 1 + cols) % cols }));
                    break;
                case "d":
                    setSelection((prev) => ({ ...prev, col: (prev.col + 1) % cols }));
                    break;
                case " ":
                    const canCombine = canCombineItem(currentItem, combineTarget, inventory, index)
                    if (canCombine.canCombine) {
                        handleCombineItems(combineTarget, index, inventory[combineTarget].combine[currentItem.combineId])
                        setCombineTarget(null);
                    } else {
                        console.log(`Can't combine because ${canCombine.reason}`)
                    }
                    break;
                case "f":
                    setCombineTarget(null);
                    break;
            }
            return;
        }

        if (!promptOpen) {
            switch (e.key.toLowerCase()) {
                case "w":
                    setSelection((prev) => ({ ...prev, row: (prev.row - 1 + rows) % rows }));
                    break;
                case "s":
                    setSelection((prev) => ({ ...prev, row: (prev.row + 1) % rows }));
                    break;
                case "a":
                    setSelection((prev) => ({ ...prev, col: (prev.col - 1 + cols) % cols }));
                    break;
                case "d":
                    setSelection((prev) => ({ ...prev, col: (prev.col + 1) % cols }));
                    break;
                case " ":
                    if (currentItem) setPromptOpen(true);
                    break;
                case "f":
                    if (gameState.menu.menuType === "pause:inventory") {
                        useGameStore.getState().handleCloseMenu();
                    } else {
                        setFocus(false);
                    }
                    break;
            }
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    const selectedItem = inventory[selection.row * cols + selection.col] || null;

    return (
        <div id="playermenu-inventory-main">
            <div id="playermenu-inventory-grid">
                {inventory.map((item, index) => {
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    const isSelected = focused && selection.row === row && selection.col === col;
                    const isEquipped = shouldDisplayEquip(index)
                    return (
                        <div
                            key={index}
                            ref={(el) => (slotRefs.current[index] = el)}
                            style={{
                                backgroundColor: isSelected ? "#ff0" : "#f9f9f9",
                                opacity: !isSelected && shouldFade(combineTarget, index, item, inventory) ? 0.1 : 1,
                            }}
                            className="playermenu-inventory-item"
                        >
                            {item ? item.name : "-"}
                            {item && item?.data?.currentAmmo >= 0 &&
                                <div className="playermenu-inventory-information">

                                    <div style={{ paddingLeft: 20 }}>
                                        {isEquipped && "Equipped"}
                                    </div>
                                    <div style={{ paddingRight: 20 }}>{item.data.currentAmmo} / {item.data.maximumAmmo}</div>
                                </div>
                            }
                        </div>
                    );
                })}
            </div>

            {promptOpen && selectedItem && (
                <PlayerMenuInventoryPrompt
                    item={selectedItem}
                    itemIndex={selection.row * cols + selection.col}
                    closePrompt={() => setPromptOpen(false)}
                    anchorRef={slotRefs.current[selection.row * cols + selection.col]}
                    onSelectCombine={() => {
                        setCombineTarget(selection.row * cols + selection.col);
                        setPromptOpen(false);
                    }}
                />
            )}
        </div>
    );
};
