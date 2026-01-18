import { WorldSpotlight } from "../objects//lights/WorldSpotlight"

export const LightManager = ({ lights }) => {
    return (
        <>
            {lights.map((light) => {
                return (
                    <WorldSpotlight {...light} />
                )
            })}
        </>
    )
}