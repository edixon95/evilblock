import { ITEM_TABLE } from "../interact/items/itemTable"

export const handleCreateItem = (position = [4, 0, 0], item, id) => {
    return {
        position,
        data: {
            ...ITEM_TABLE[item],
            id
        }
    };
};
