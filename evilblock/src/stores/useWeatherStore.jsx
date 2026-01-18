import { create } from "zustand"
import { extractFromLevelTable } from "../data/floors/levelTable"

export const useWeatherStore = create((set, get) => ({
    weather: extractFromLevelTable("weather"),
}))
