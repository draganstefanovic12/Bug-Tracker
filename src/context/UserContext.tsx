import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Notification } from "../types/types";

type User = {
  username: string;
  token: string;
  notifications: Notification[];
  role: string;
};

type UserState = {
  user: User | null;
};

type UserContextProps = {
  user: any;
  dispatch: React.Dispatch<ActionType>;
};

type ProviderProps = {
  children: ReactNode;
};

const UserContext = createContext({} as UserContextProps);

export const useUser = () => {
  return useContext(UserContext);
};

const initialState = { user: null } as UserState;

type ActionType =
  | {
      type: "LOGIN";
      payload: User;
    }
  | { type: "LOGOUT" };

const userReducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("BTUser", JSON.stringify(action.payload));
      return { user: action.payload };
    }
    case "LOGOUT": {
      localStorage.removeItem("BTUser");
      return { user: null };
    }
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem("BTUser");
    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
