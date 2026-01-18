import { WorldSpotlight } from "../objects/WorldSpotlight"

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