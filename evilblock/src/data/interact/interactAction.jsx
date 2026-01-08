const EQUIP = {
    label: "Equip",
    action: ({ handleEquipItem }) => handleEquipItem()
}

const RELOAD = {
    label: "Reload",
    action: ({ handleReloadItem }) => handleReloadItem()
}

const USE = {
    label: "Use",
    action: ({ handleUseItem }) => handleUseItem()
}

const COMBINE = {
    label: "Combine",
    action: ({ handleStartCombine }) => handleStartCombine()
}

const EXAMINE = {
    label: "Examine",
    action: ({ handleExamineItem }) => handleExamineItem()
}

export const interactAction = {
    EQUIP,
    RELOAD,
    USE,
    COMBINE,
    EXAMINE
}

export const interactActionPreset = {
    CONSUMABLE: [
        USE,
        COMBINE,
        EXAMINE
    ],
    WEAPON: [
        EQUIP,
        RELOAD,
        EXAMINE
    ]
}