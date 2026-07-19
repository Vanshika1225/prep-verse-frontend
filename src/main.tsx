import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { store } from "./redux/store.tsx";

const rootElement = document.getElementById("root");
const googleClientId = import.meta.env["VITE_GOOGLE_CLIENT_ID"] as string;

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </StrictMode>,
  );
}
