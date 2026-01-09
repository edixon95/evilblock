import { useEffect, useState, useRef } from "react";
import { useInventoryStore } from "../../stores/useInventoryStore";
import { PlayerMenuInventoryPrompt } from "./PlayerMenuInventoryPrompt";

export const PlayerMenuInventory = ({ focused, setFocus }) => {
    const inventory = useInventoryStore((state) => state.inventory);
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
                    if (
                        currentItem &&
                        Object.keys(inventory[combineTarget].combine || {}).some((key) =>
                            currentItem.id.toLowerCase().includes(key.toLowerCase())
                        )
                    ) {
                        console.log(
                            "Combining",
                            `${inventory[combineTarget].name}, which is at idx ${combineTarget}`,
                            "with",
                            `${currentItem.name} which is at idx ${index}`
                        );
                        setCombineTarget(null);
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
                    setFocus(false);
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
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gridTemplateRows: "repeat(3, 1fr)",
                    gap: "8px",
                    width: "100%",
                    height: "100%",
                }}
            >
                {inventory.map((item, index) => {
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    const isSelected = focused && selection.row === row && selection.col === col;

                    const faded =
                        combineTarget !== null &&
                        index !== combineTarget && // item A never fades
                        (!item || !Object.keys(inventory[combineTarget].combine || {}).some((key) =>
                            item.id.toLowerCase().includes(key.toLowerCase())
                        ));

                    return (
                        <div
                            key={index}
                            ref={(el) => (slotRefs.current[index] = el)}
                            style={{
                                border: "1px solid #ccc",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: isSelected ? "#ff0" : "#f9f9f9",
                                fontWeight: "bold",
                                position: "relative",
                                opacity: !isSelected && faded ? 0.1 : 1,
                                transition: "opacity 0.3s ease"
                            }}
                        >
                            {item ? item.name : "-"}
                        </div>
                    );
                })}
            </div>

            {promptOpen && selectedItem && (
                <PlayerMenuInventoryPrompt
                    item={selectedItem}
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
