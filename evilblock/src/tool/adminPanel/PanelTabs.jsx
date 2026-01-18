export const PanelTabs = ({ activeTab, handleSetActiveTab }) => {
    const tabs = ["Teleport", "Options"]

    return (
        <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
            {tabs.map((tab) => (
                <button
                    key={`admin-tab-${tab}`}
                    onClick={() => handleSetActiveTab(tab)}
                    style={{
                        flex: 1,
                        background:
                            activeTab === tab ? "#444" : "#222",
                        color: "#fff",
                        border: "1px solid #555",
                    }}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}