import { create } from "zustand";
import { extractFromLevelTable } from "../data/floors/levelTable";

export const usePropStore = create((set, get) => ({
    props: extractFromLevelTable("props"),

    tryCollectFromProp: (level, room, id) => {
        set((state) => {
            const levelProps = state.props[level];
            if (!levelProps) return state;

            const roomProps = levelProps[room];
            if (!Array.isArray(roomProps)) return state;

            return {
                props: {
                    ...state.props,
                    [level]: {
                        ...levelProps,
                        [room]: roomProps.map((prop) =>
                            prop.extra?.id === id
                                ? {
                                    ...prop,
                                    extra: {
                                        ...prop.extra,
                                        isCollected: true,
                                    },
                                }
                                : prop
                        ),
                    },
                },
            };
        });
    },
}));
