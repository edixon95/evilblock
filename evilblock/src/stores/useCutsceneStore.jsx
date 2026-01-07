import { create } from "zustand"
import { CUTSCENE_TABLE } from "../data/cutscenes/cutsceneTable"

export const useCutsceneStore = create((set, get) => ({
    cutscenes: CUTSCENE_TABLE,

    shouldCutscenePlay: (id) => {
        const { cutscenes } = get();
        const cutscene = cutscenes[id];
        if (!cutscene) return false

        // Attach the id so it can be passed to data store
        cutscene.id = id

        return cutscene.active ? cutscene : false
    }
}))
