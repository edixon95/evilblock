
import { useRef } from "react";
import { Item } from "../objects/interact/Item";

export const interactMeshes = [];

const interactTypes = {
    ITEM: Item
}

export const InteractManager = ({ items }) => {
    if (!items) return null;
    interactMeshes.length = 0;

    return (
        <>
            {items.map((item) => {
                const ref = useRef();
                interactMeshes.push(ref);
                const InteractComponent = interactTypes[item.data.type]

                if (InteractComponent) {
                    return (
                        <InteractComponent
                            ref={ref}
                            key={item.id}
                            item={item}
                        />
                    )
                }
            })}
        </>
    );
};
