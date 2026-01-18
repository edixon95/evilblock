import { useAdminStore } from "../../stores/useAdminStore";

export const AdminOptions = ({ handleToggleOpen }) => {
    const adminState = useAdminStore((state) => state.adminState);
    const toggleAdminState = useAdminStore((state) => state.toggleAdminState);

    const optionOptions = [
        ...Object.entries(adminState).map(([key, value]) => ({
            txt: key === "dev" ? "isDev" : key,
            fn: () => toggleAdminState(key),
        })),
        { txt: "Close Admin", fn: handleToggleOpen },
    ];

    return (
        <>
            <h2>Options Panel</h2>

            {optionOptions.map((op) => {
                const isStateButton = op.txt !== "Close Admin";

                return (
                    <button
                        key={`admin-options-${op.txt}`}
                        onClick={() => op.fn()}
                        style={{
                            display: "block",
                            width: "100%",
                            marginBottom: 6,
                            textAlign: "left",
                        }}
                    >
                        {op.txt}
                        {isStateButton && (
                            <> : {adminState[op.txt === "isDev" ? "dev" : op.txt] ? "ON" : "OFF"}</>
                        )}
                    </button>
                );
            })}
        </>
    );
};
