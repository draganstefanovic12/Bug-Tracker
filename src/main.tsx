import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./features/store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { DatabaseContextProvider } from "./context/DatabaseContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DatabaseContextProvider>
          <App />
        </DatabaseContextProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
