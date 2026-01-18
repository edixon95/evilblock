export const handleCreateLight = (type, args = {}) => {
    if (type === "spotlight") {
        return {
            type,
            color: args.color ?? "#ffffff",
            intensity: args.intensity ?? 5,
            position: [
                args.position?.[0] ?? 0,
                args.height ?? 4.5,
                args.position?.[1] ?? 0,
            ],
            angle: args.angle ?? Math.PI / 4,
            penumbra: args.penumbra ?? 0.3,
        }
    }

    if (type === "rect") {
        return {
            type,
            color: args.color ?? "#00ffff",
            intensity: args.intensity ?? 10,
            position: [
                args.position?.[0] ?? 0,
                args.height ?? 3,
                args.position?.[1] ?? 0,
            ],
            width: args.width ?? 3,
            height: args.rectHeight ?? 0.4,
            rotation: args.rotation ?? [0, 0, 0],
        }
    }

    return null
}
