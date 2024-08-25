import { create } from "zustand";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface User {  
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUserFromSession: (session: any) => void;
  clearUser: () => void;
}

// Create the Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUserFromSession: (session) => {
    if (session?.user) {
      set({
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          role: session.user.role || "user", // Default role if not specified
        },
        isAuthenticated: true,
      });
    } else {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
  clearUser: () => set({
    user: null,
    isAuthenticated: false,
  }),
}));

// Automatically update the store based on session changes
export const useSessionSync = () => {
  const { data: session } = useSession();
  const setUserFromSession = useAuthStore((state) => state.setUserFromSession);

  useEffect(() => {
    setUserFromSession(session);
  }, [session, setUserFromSession]);
};
