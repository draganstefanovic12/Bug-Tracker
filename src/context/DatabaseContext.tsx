import { Project, User } from "../types/types";
import { createContext, ReactNode, useContext, useReducer } from "react";

type DatabaseContextProps = {
  projects: Project[];
  users: User[];
  dispatch: React.Dispatch<ActionProps>;
};

type ProviderProps = {
  children: ReactNode;
};

const DatabaseContext = createContext({} as DatabaseContextProps);

export const useDatabase = () => {
  return useContext(DatabaseContext);
};

type ActionProps =
  | { type: "ADD_PROJ"; payload: Project[] }
  | { type: "ADD_USR"; payload: User[] };

const initialState = {
  projects: [] as Project[],
  users: [] as User[],
};

const databaseReducer = (state: typeof initialState, action: ActionProps) => {
  switch (action.type) {
    case "ADD_PROJ": {
      return { ...state, projects: action.payload, users: state.users };
    }
    case "ADD_USR": {
      return { ...state, users: action.payload, projects: state.projects };
    }
    default:
      return state;
  }
};

export const DatabaseContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(databaseReducer, initialState);

  return (
    <DatabaseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DatabaseContext.Provider>
  );
};
