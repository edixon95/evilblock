import { useState } from "react";
import { useGameStore } from "../stores/useGameStore";
import { INVENTORY } from "./menuConstants";
import { PlayerMenuInventory } from "./playerMenuComponents/PlayerMenuInventory";
import { PlayerMenuMenuOption } from "./playerMenuComponents/PlayerMenuMenuOption";

export const PlayerMenu = () => {
    const gameState = useGameStore((state) => state.gameState);

    const menuOptions = ["Inventory", "Notes", "Options"];

    const [menuType, setMenuType] = useState({
        menu: menuOptions[0],
        focused: false,
    });

    const moveSelection = (menu) => {
        setMenuType((prev) => ({
            ...prev,
            menu,
        }));
    };

    const setFocus = (focused) => {
        setMenuType((prev) => ({
            ...prev,
            focused,
        }));
    };

    if (!gameState.menu.active) return null;
    return (
        <div
            style={{
                backgroundColor: "red",
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 10,
                gap: "1%",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    backgroundColor: "orange",
                    width: "100%",
                    height: "18%",
                    display: "flex",
                    gap: "1%",
                }}
            >
                <div style={{ flex: 1, backgroundColor: "yellow" }}>Player information</div>
                <div style={{ flex: 1, backgroundColor: "green" }}>
                    <PlayerMenuMenuOption
                        menuOptions={menuOptions}
                        moveSelection={moveSelection}
                        setFocus={setFocus}
                        focused={!menuType.focused} // only active if menu has control
                    />
                </div>
            </div>

            <div style={{ backgroundColor: "green", flex: 1 }}>
                {menuType.menu === INVENTORY && (
                    <PlayerMenuInventory
                        focused={menuType.focused}
                        setFocus={setFocus}
                    />
                )}
            </div>
        </div>
    );
};
