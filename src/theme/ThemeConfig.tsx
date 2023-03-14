// 2023-03-06 20:00:00

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "../redux/store";
import GlobalStyles from "./GlobalStyles";

export interface IThemeConfigProps {
  children?: React.ReactElement | React.ReactElement[];
}

export default function ThemeConfig(props: IThemeConfigProps) {
  const globalTheme = useAppSelector((state) => state.global.theme);

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: globalTheme } })}>
      <CssBaseline />
      <GlobalStyles />
      {props.children}
    </ThemeProvider>
  );
}
