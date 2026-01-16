export const handleCreateProp = (position, size, extra) => {
    console.log("d", extra)

    const extendExtra = {
        ...extra,
        type: "PROP",
        subType: "PROP",
        isCollected: extra?.item ? false : true,
        canExamine: extra?.canExamine ?? true
    }

    console.log(extendExtra)

    return ({
        position,
        size,
        extra: extendExtra
    })
}