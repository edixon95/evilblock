export const handleCreateWeather = (type, args) => {
    if (type === "ambient")
        return {
            type: "ambientLight",
            intensity: args.intensity,
            color: args.color
        }

    if (type === "fog")
        return {
            type: "fog",
            color: args.color,
            near: args.near,
            far: args.far
        }
}