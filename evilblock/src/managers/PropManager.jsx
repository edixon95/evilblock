import { useRef } from "react";
import { Prop } from "../objects/Prop";

export const propMeshes = [];


export const PropManager = ({ props }) => {
    if (!props || props.length == 0) return;

    propMeshes.length = 0;
    return (
        <>
            {props.map((prop) => {
                const ref = useRef();
                propMeshes.push(ref);

                return (
                    <Prop prop={prop} ref={ref} />
                );
            })}
        </>
    )
}