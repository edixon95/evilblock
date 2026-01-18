import { useRef } from "react";
import { propCatalogue } from "../objects/props/propCatalogue";

export const propMeshes = [];

const PropItem = ({ prop, ...rest }) => {
    const Component = propCatalogue[prop.prefab ?? "square"]
    return <Component prop={prop} {...rest} />
}

export const PropManager = ({ props }) => {
    if (!props || props.length == 0) return;

    propMeshes.length = 0;
    return (
        <>
            {props.map((prop) => {
                const ref = useRef();
                propMeshes.push(ref);

                return (
                    <PropItem prop={prop} ref={ref} />
                )
            })}
        </>
    )
}