import { create } from "zustand";

export const useAdminStore = create((set, get) => ({
    adminState: {
        isDev: false,
        shake: false,
        pixel: true,
        chromatic: true,
        fog: true,
        moody: true,
    },

    toggleAdminState: (key) => {
        set((state) => {
            return {
                adminState: {
                    ...state.adminState,
                    [key]: !state.adminState[key],
                },
            };
        });
    },
}));
