import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useItemStore = create((set, get) => ({
    items: extractFromLevelTable("items"),

    handleMarkItemCollected: (level, room, id) => {
        set(state => {
            const floorItems = state.items[level];
            if (!floorItems) return state;

            const roomItems = floorItems[room];
            if (!roomItems) return state;

            return {
                items: {
                    ...state.items,
                    [level]: {
                        ...floorItems,
                        [room]: roomItems.map(item =>
                            item.data.id === id
                                ? {
                                    ...item,
                                    data: {
                                        ...item.data,
                                        isCollected: true
                                    }
                                }
                                : item
                        )
                    }
                }
            };
        });
    }
}))
