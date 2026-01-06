
import { useRef } from "react";
import { Door } from "../objects/doors/Door";
import { Stair } from "../objects/doors/Stair";
import { STAIR } from "../constants/doorConstants";

export const doorMeshes = [];

export const DoorManager = ({ doors }) => {
    if (!doors) return null;
    console.log(doors)
    doorMeshes.length = 0;

    return (
        <>
            {doors.map((door, i) => {
                const ref = useRef();
                doorMeshes.push(ref);

                if (door.type === STAIR) {
                    return <Stair key={door.id} stair={door} ref={ref} />;
                }

                return <Door key={door.id} door={door} ref={ref} />;
            })}
        </>
    );
};
