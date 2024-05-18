import { ThemeProvider as ScThemeProvider } from "styled-components";
import { ReactNode, useEffect, useState } from "react";
import { themes } from "./themes";

/**
 * Handle system theme preference
 *
 * This will prefer dark mode over light if the theme is unknown
 */
export const ThemeProvider: React.FC<{
  children: ReactNode | ReactNode[] | null;
}> = ({ children }) => {
  const [theme, setTheme] = useState<keyof typeof themes>(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
  );

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "light" : "dark");
    };

    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", onChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: light)")
        .removeEventListener("change", onChange);
    };
  });

  return <ScThemeProvider theme={themes[theme]}>{children}</ScThemeProvider>;
};
