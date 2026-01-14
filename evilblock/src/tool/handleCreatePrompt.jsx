export const handleCreatePrompt = (text, type = "CONFIRMATION", confirm = "Yes", decline = "Cancel") => {
    const options = []
    if (confirm !== false)
        options.push(
            {
                function: "confirm",
                optionText: confirm
            }
        )

    if (decline !== false)
        options.push(
            {
                function: "cancel",
                optionText: decline
            }
        )

    return {
        text,
        type,
        options
    }
}