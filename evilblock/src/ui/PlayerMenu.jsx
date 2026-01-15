import { useEffect, useState } from "react";
import { useGameStore } from "../stores/useGameStore";
import { INVENTORY } from "./menuConstants";
import { PlayerMenuInventory } from "./playerMenuComponents/PlayerMenuInventory";
import { PlayerMenuMenuOption } from "./playerMenuComponents/PlayerMenuMenuOption";

import "./css/playerMenu.css"

export const PlayerMenu = () => {
    const gameState = useGameStore((state) => state.gameState);

    const menuOptions = ["Inventory", "Notes", "Options", "Close"];

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
        if (menuType.menu === "Close") {
            useGameStore.getState().handleCloseMenu()
            return
        }

        setMenuType((prev) => ({
            ...prev,
            focused,
        }));
    };

    useEffect(() => {
        if (gameState.menu.active && gameState.menu.menuType === "pause:inventory") {
            setMenuType((prev) => ({
                ...prev,
                menu: INVENTORY,
                focused: true
            }));
        }
    }, [gameState.menu.menuType])

    useEffect(() => {
        if (!gameState.menu.active) {
            setMenuType((prev) => ({
                ...prev,
                menu: menuOptions[0], // Maybe this one gets removed?
                focused: false
            }));
        }
    }, [gameState.menu.menuType])

    if (!gameState.menu.active) return null;
    return (
        <div id="playermenu-main"
        >
            <div>
                <div id="information-box">Player information</div>
                <div id="options-box">
                    <PlayerMenuMenuOption
                        menuOptions={menuOptions}
                        moveSelection={moveSelection}
                        setFocus={setFocus}
                        focused={!menuType.focused} // only active if menu has control
                    />
                </div>
            </div>

            <div id="menu-viewsection">
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
