import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserContextProvider } from "./context/UserContext";
import { DatabaseContextProvider } from "./context/DatabaseContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./features/store/store";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <DatabaseContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </DatabaseContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
