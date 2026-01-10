export const shouldFade = (combineStartIndex, combineEndIndex, item, inventory) => {
    if (combineStartIndex === null || combineEndIndex === combineStartIndex) return false;

    const combineKeys = Object.keys(inventory[combineStartIndex].combine || {});

    if (!item) return true;

    const combineKeysAreReagents = combineKeys.every(
        (k) => k.toLowerCase().startsWith("reagent") && item.combineId.toLowerCase().startsWith("reagent")
    );

    if (combineKeysAreReagents) {
        const canonicalOrder = ["G", "R", "B", "Y"];

        const canonicalize = (id) => {
            const letters = id.replace("reagent", "").split("");
            letters.sort((a, b) => canonicalOrder.indexOf(a) - canonicalOrder.indexOf(b));
            return letters.join("");
        };

        const itemCanonical = canonicalize(item.combineId);

        return !combineKeys.some((key) => canonicalize(key) === itemCanonical);
    } else {
        return !combineKeys.some((key) => item.combineId.toLowerCase() === key.toLowerCase());
    }
};
