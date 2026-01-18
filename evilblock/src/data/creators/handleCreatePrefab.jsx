export const handleCreatePrefab = (position, rotation = 1, prefab, extra) => {
    const extendedAction = !extra?.action ? false : {
        ...extra.action,
        isComplete: false
    }

    const extendExtra = {
        ...extra,
        type: "PROP",
        subType: "PROP",
        isCollected: extra?.item ? false : true,
        canExamine: extra?.canExamine ?? true,
        action: extendedAction
    }

    return ({
        position,
        rotation,
        prefab,
        extra: extendExtra,
    })
}