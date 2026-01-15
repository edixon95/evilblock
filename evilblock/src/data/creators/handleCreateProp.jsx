export const handleCreateProp = (position, size, extra) => {
    const extendExtra = {
        ...extra,
        type: "PROP",
        subType: "PROP",
        isCollected: extra?.item ? false : true
    }

    return ({
        position,
        size,
        extra: extendExtra
    })
}