export const canCombineItem = (currentItem, combineStartIndex, inventory, combineEndIndex) => {
    if (combineStartIndex === combineEndIndex) {
        return {
            canCombine: false,
            reason: "Identical Index"
        };
    }

    const targetItem = inventory[combineStartIndex];
    if (!currentItem || !targetItem.combine) {
        return { canCombine: false, reason: "Invalid combine" };
    }

    const combineKeys = Object.keys(targetItem.combine || {});

    const isReagentCombo = combineKeys.every(k => k.toLowerCase().startsWith("reagent"));

    if (isReagentCombo) {
        const canonicalOrder = ["G", "R", "B", "Y"];

        const canonicalize = (id) => {
            const letters = id.replace("reagent", "").split("");
            letters.sort((a, b) => canonicalOrder.indexOf(a) - canonicalOrder.indexOf(b));
            return letters.join("");
        };

        const currentCanonical = canonicalize(currentItem.combineId);

        const canCombine = combineKeys.some((key) => canonicalize(key) === currentCanonical);

        return { canCombine, reason: "Invalid combine" };
    } else {
        // For non-reagent items, strict match
        const canCombine = combineKeys.some(
            (key) => currentItem.combineId.toLowerCase() === key.toLowerCase()
        );
        return { canCombine, reason: "Invalid combine" };
    }
};
