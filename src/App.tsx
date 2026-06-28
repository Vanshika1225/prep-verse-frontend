import FloatingAlerts from "@components/FloatingAlerts";
import { ThemeProvider } from "@mui/material";
import "./App.css";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes/Rroutes";
import Theme from "./theme/theme";

function App() {
  return (
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router} />
        <FloatingAlerts />
      </ThemeProvider>
  );
}

export default App;
