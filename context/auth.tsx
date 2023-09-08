import { router, useRootNavigationState, useSegments } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  uid: string;
  createdAt: string;
  displayName: string;
  lastLoginAt: string;
  photoURL: string;
  providerId: string;
  email: string;
}

interface ContextInterface {
  user: User | null;
  signIn: Dispatch<SetStateAction<User>>;
  signOut: () => void;
}

const initialState = {
  uid: "",
  createdAt: "",
  displayName: "",
  lastLoginAt: "",
  photoURL: "",
  providerId: "",
  email: "",
};

const contextInitialState: ContextInterface = {
  user: initialState,
  signIn: () => {},
  signOut: () => {},
};

const AuthContext = createContext(contextInitialState);

export function useAuth(): ContextInterface {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a Provider");
  }

  return context;
}

function useProtectedRoute(user: User) {
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (!navigationState.key || hasNavigated) return;
    const inAuthGroup = segments[0] === "(auth)";

    if (!user.uid && !inAuthGroup) {
      router.replace("/(auth)/sign-in");
      setHasNavigated(true);
    } else if (user.uid && inAuthGroup) {
      router.replace("/(tabs)");
      setHasNavigated(true);
    }
  }, [user.uid, segments, navigationState, hasNavigated]);
}

export function AuthProvider({ children }: PropsWithChildren): ReactNode {
  const [user, setUser] = useState<User>(initialState);
  useProtectedRoute(user);
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(JSON.stringify(user, null, 2));
        const dataWeCareAbout: User = {
          uid: user.uid,
          displayName: user.providerData[0].displayName ?? "",
          photoURL: user.providerData[0].photoURL ?? "",
          providerId: user.providerData[0].providerId,
          email: user.providerData[0].email ?? "",
          createdAt: user.metadata.creationTime!,
          lastLoginAt: user.metadata.lastSignInTime!,
        };
        setUser(dataWeCareAbout);
        router.replace("/(tabs)");
      } else {
        // console.log("user is not authenticated");
        router.replace("/(auth)/sign-in");
      }
    });
    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn: setUser,
        signOut: () => {
          setUser(initialState);
          signOut(auth);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
