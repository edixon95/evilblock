import { useEffect, useState } from "react";

export const PlayerMenuInventoryPrompt = ({ item, closePrompt, anchorRef, onSelectCombine }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (anchorRef) {
            const rect = anchorRef.getBoundingClientRect();
            const parentRect = anchorRef.parentElement.getBoundingClientRect();
            setPosition({
                top: rect.top - parentRect.top,
                left: rect.left - parentRect.left,
            });
        }
    }, [anchorRef]);

    const handleKeyDown = (e) => {
        if (!item) return;

        switch (e.key.toLowerCase()) {
            case "w":
                setSelectedOption((prev) => (prev - 1 + item.options.length) % item.options.length);
                break;
            case "s":
                setSelectedOption((prev) => (prev + 1) % item.options.length);
                break;
            case " ":
                const option = item.options[selectedOption];
                switch (option.label) {
                    case "Use":
                        console.log("Using", item.name);
                        closePrompt();
                        break;
                    case "Combine":
                        onSelectCombine();
                        break;
                    case "Examine":
                        console.log("Examining", item.name);
                        closePrompt();
                        break;
                }
                break;
            case "f":
                closePrompt();
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
                position: "absolute",
                top: position.top,
                left: position.left,
                backgroundColor: "#222",
                color: "#fff",
                border: "2px solid #fff",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                zIndex: 10,
                minWidth: "120px",
            }}
        >
            {item.options.map((opt, i) => (
                <div
                    key={i}
                    style={{
                        fontWeight: selectedOption === i ? "bold" : "normal",
                        textDecoration: selectedOption === i ? "underline" : "none",
                    }}
                >
                    {opt.label}
                </div>
            ))}
        </div>
    );
};
