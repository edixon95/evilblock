import { Chair1 } from "./prefabs/Chair1"
import { Prop } from "./prefabs/Prop"
import { RoadSupport } from "./prefabs/RoadSupport"
import { Tent1 } from "./prefabs/Tent1"
import { StreetLight, CeilingLight, DeskLamp, FluorescentLight } from "./prefabs/BasicLights"

export const propCatalogue = {
    square: Prop,

    // Chairs
    chair1: Chair1,
    tent1: Tent1,
    roadSupport: RoadSupport,
    streetLight: StreetLight,
    ceilingLight: CeilingLight,
    deskLamp: DeskLamp,
    fluorescentLight: FluorescentLight
}