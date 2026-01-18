import { WorldSpotlight } from "../objects/lights/WorldSpotlight"
import { WorldRectLight } from "../objects/lights/WorldRectLight"

export const LightManager = ({ lights }) => {
    return (
        <>
            {lights.map((light, i) => {
                switch (light.type) {
                    case "spotlight":
                        return <WorldSpotlight key={i} {...light} />

                    case "rect":
                        return <WorldRectLight key={i} {...light} />

                    default:
                        return null
                }
            })}
        </>
    )
}
