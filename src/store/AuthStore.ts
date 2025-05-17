import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {create} from 'zustand';
import {createJSONStorage, persist, StateStorage} from 'zustand/middleware';

const SecureStorage: StateStorage = {
  setItem: async (name, value) => {
    await RNSecureStorage.setItem(name, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
  },
  getItem: async name => {
    const value = await RNSecureStorage.getItem(name);
    return value ?? null;
  },
  removeItem: async name => {
    await RNSecureStorage.removeItem(name);
  },
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  signupEmail: string | null;
  isStoreHydrated: boolean; //to check if store has loaded upon reloading app
  setSignupEmail: (email: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setIsHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      refreshToken: null,
      signupEmail: null,
      isStoreHydrated: false,
      setSignupEmail: email => set({signupEmail: email}),
      setTokens: (accessToken, refreshToken) =>
        set({accessToken, refreshToken}),
      logout: () => set({accessToken: null, refreshToken: null}),
      setIsHydrated: () => set({isStoreHydrated: true}),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => state => {
        state?.setIsHydrated();
      },
      storage: createJSONStorage(() => SecureStorage),
    },
  ),
);
