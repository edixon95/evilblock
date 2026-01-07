import { create } from "zustand"
import { CUTSCENE_TABLE } from "../data/cutscenes/cutsceneTable"
import { useGameStore } from "./useGameStore";

export const useCutsceneStore = create((set, get) => ({
    cutscenes: CUTSCENE_TABLE,

    shouldCutscenePlay: (id) => {
        const { cutscenes } = get();
        const cutscene = cutscenes[id];
        if (!cutscene) return false
        if (cutscene.active) {
            useGameStore.getState().handleChangeCutscene(id)
            return true
        }
        return false
    }
}))
