import { consumableConstants } from "./consumableConstants";

const isValidCombo = (a, b) => {
    const lettersA = a.replace("reagent", "").split("");
    const lettersB = b.replace("reagent", "").split("");
    const combined = [...lettersA, ...lettersB];

    if (combined.length > 3) return false;

    const counts = combined.reduce((acc, l) => {
        acc[l] = (acc[l] || 0) + 1;
        return acc;
    }, {});

    // Max counts
    if ((counts["G"] || 0) > 3) return false;
    if ((counts["R"] || 0) > 2) return false;
    if ((counts["B"] || 0) > 2) return false;
    if ((counts["Y"] || 0) > 1) return false;

    // Triples must contain at least 1 G
    if (combined.length === 3 && !(counts["G"] >= 1)) return false;

    return true;
};

// Define the canonical order to match constants
const canonicalOrder = ["G", "R", "B", "Y"];

const getSortedOutput = (a, b) => {
    const letters = [...a.replace("reagent", ""), ...b.replace("reagent", "")];
    letters.sort((x, y) => canonicalOrder.indexOf(x) - canonicalOrder.indexOf(y));
    return "reagent" + letters.join("");
};


// Function to generate the full combo graph
export const generateComboGraph = () => {
    const allReagents = Object.values(consumableConstants);
    const comboGraph = {};

    allReagents.forEach((reagent) => {
        comboGraph[reagent] = {};
        allReagents.forEach((other) => {
            if (isValidCombo(reagent, other)) {
                comboGraph[reagent][other] = { type: "COMBINE", output: getSortedOutput(reagent, other) };
            }
        });
    });

    return comboGraph;
};