export const PlayerMenuMenuOption = () => {
    const menuOptions = ["Inventory", "Notes", "Options"]

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            height: "100%",
            alignItems: "center"
        }}>
            {menuOptions.map((op) => {
                return (
                    <div
                        style={{
                            fontSize: 30,
                            fontWeight: "bold"
                        }}
                    >
                        {op}</div>
                )
            })}
        </div>
    )
}