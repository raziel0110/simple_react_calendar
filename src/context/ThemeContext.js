import { useContext, createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{isDark, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
}
export default ThemeProvider;
