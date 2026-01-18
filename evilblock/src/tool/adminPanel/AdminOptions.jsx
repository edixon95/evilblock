export const AdminOptions = ({ handleToggleOpen }) => {

    const optionOptions = [
        { txt: "Close", fn: handleToggleOpen }
    ]

    return (
        <>
            <h2>Options Panel</h2>

            {optionOptions.map((op) => (
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
                </button>
            ))}

        </>
    );
};
