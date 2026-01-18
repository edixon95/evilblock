export const WeatherManager = ({ weather, settings }) => {

    const { isDev, moody, fog } = settings


    return (
        <>
            {weather.map((effect) => {
                if (effect.type === "ambientLight") {
                    return (
                        <ambientLight
                            intensity={isDev ? 1.2 : effect.intensity}
                            color={isDev ? "#ffffff" : moody ? effect.color : "#ffffff"}
                        />
                    )
                } else if (effect.type === "fog" && fog) {
                    return (
                        <fog attach="fog" args={[effect.color, effect.near, effect.far]} />
                    )
                }
            })}
        </>
    )
}