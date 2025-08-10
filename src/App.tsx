import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { useThemeStore } from "./modules/theme/hooks/useTheme";

const App: React.FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
};

export default App;
