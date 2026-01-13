export const handleCreatePrompt = (text, type = "CONFIRMATION", confirm = "Yes", decline = "Cancel") => {
    return {
        text,
        type,
        options: [
            {
                function: "confirm",
                optionText: confirm
            },
            {
                function: "cancel",
                optionText: decline
            }
        ]
    }
}