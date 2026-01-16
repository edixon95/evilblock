const EQUIP = {
    label: "Equip",
    action: ({ handleEquipItem }) => handleEquipItem()
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
    CONSUMABLELAST: [
        USE,
        EXAMINE
    ],
    WEAPON: [
        EQUIP,
        COMBINE,
        EXAMINE
    ],
    AMMO: [
        COMBINE,
        EXAMINE
    ],
    MATERIAL: [
        COMBINE,
        EXAMINE
    ],
    KEY: [
        EXAMINE
    ]
}