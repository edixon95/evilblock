import { useState } from "react";
import { AdminTeleport } from "./adminPanel/AdminTeleport";
import { PanelTabs } from "./adminPanel/PanelTabs";
import { AdminOptions } from "./adminPanel/AdminOptions";

export const AdminPanel = () => {
    const [panelState, setPanelState] = useState({
        isOpen: false,
        activeTab: null,
    })

    const handleToggleOpen = () => {
        setPanelState((prev) => ({
            ...prev,
            isOpen: !prev.isOpen
        }))
    }
    const handleSetActiveTab = (tab) => {
        setPanelState((prev) => ({
            ...prev,
            activeTab: tab
        }))
    }



    return (
        <div
            style={{
                position: "absolute",
                top: 25,
                right: 25,
                padding: 16,
                backgroundColor: "black",
                color: "#fff",
                zIndex: 99999,
                width: 320,
                fontFamily: "monospace",
            }}
        >

            {!panelState.isOpen ? <button
                onClick={() => handleToggleOpen()}
                style={{
                    display: "block",
                    width: "100%",
                    marginBottom: 6,
                    textAlign: "left",
                }}
            >
                Open
            </button>
                :
                <>
                    <PanelTabs
                        activeTab={panelState.activeTab}
                        handleSetActiveTab={handleSetActiveTab}
                    />

                    {panelState.activeTab === "Teleport" ?
                        <AdminTeleport /> : null
                    }

                    {panelState.activeTab === "Options" ?
                        <AdminOptions handleToggleOpen={handleToggleOpen} /> : null
                    }
                </>
            }


        </div>
    );
};
