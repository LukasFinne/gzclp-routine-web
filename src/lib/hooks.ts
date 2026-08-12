import { onAuthStateChanged, type User } from "firebase/auth";
import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { auth } from "./firebase";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthContextType>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setAuthState({
        user: firebaseUser,
        isLoading: false,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => authState,
    [authState.user, authState.isLoading],
  );

  return createElement(AuthContext.Provider, { value }, children);
};

export const useUser = () => useContext(AuthContext);



