import { useEffect, useState } from "react";
import { useInventoryStore } from "../../stores/useInventoryStore";

export const PlayerMenuInventory = ({ focused, setFocus }) => {
    const inventory = useInventoryStore((state) => state.inventory);
    const [selection, setSelection] = useState({ row: 0, col: 0 });

    const handleKeyDown = (e) => {
        if (!focused) return;

        const rows = 3;
        const cols = 4;

        switch (e.key.toLowerCase()) {
            case "w":
                setSelection((prev) => ({
                    ...prev,
                    row: (prev.row - 1 + rows) % rows,
                }));
                break;
            case "s":
                setSelection((prev) => ({
                    ...prev,
                    row: (prev.row + 1) % rows,
                }));
                break;
            case "a":
                setSelection((prev) => ({
                    ...prev,
                    col: (prev.col - 1 + cols) % cols,
                }));
                break;
            case "d":
                setSelection((prev) => ({
                    ...prev,
                    col: (prev.col + 1) % cols,
                }));
                break;
            case " ":
                const index = selection.row * cols + selection.col;
                console.log("Selected item:", inventory[index]);
                break;
            case "f":
                setFocus(false);
                break;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    return (
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

                return (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isSelected ? "#ff0" : "#f9f9f9",
                            fontWeight: "bold",
                        }}
                    >
                        {item ? item.name : "-"}
                    </div>
                );
            })}
        </div>
    );
};
