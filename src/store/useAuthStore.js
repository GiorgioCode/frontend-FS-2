import { create } from "zustand";

export const useAuthStore = create((set, get) => {
    const initializeAuth = () => {
        if (typeof window !== "undefined") {
            const storedToken = sessionStorage.getItem("authToken");
            const storedUser = sessionStorage.getItem("authUser");

            if (storedToken && storedUser) {
                try {
                    return {
                        token: storedToken,
                        user: JSON.parse(storedUser),
                        isAuthenticated: true,
                    };
                } catch (error) {
                    console.error("Error al parsear usuario: ", error);
                    sessionStorage.removeItem("authToken");
                    sessionStorage.removeItem("authUser");
                }
            }
        }
        return {
            token: null,
            user: null,
            isAuthenticated: false,
        };
    };
    const initialState = initializeAuth();
    return {
        token: initialState.token,
        user: initialState.user,
        isAuthenticated: initialState.isAuthenticated,
        setAuth: () => {
            if (typeof window !== "undefined") {
                sessionStorage.setItem("authToken", token);
                sessionStorage.setItem("authUser", JSON.stringify(user));
            }
            set({ token, user, isAuthenticated: true });
        },
        logout: () => {
            if (typeof window !== "undefined") {
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("authUser");
            }
            set({ token, user: null, isAuthenticated: false });
        },
        updateUser: (user) => {
            if (typeof window !== "undefined") {
                sessionStorage.setItem("authUser", JSON.stringify(user));
            }
            set({ user });
        },
    };
});
