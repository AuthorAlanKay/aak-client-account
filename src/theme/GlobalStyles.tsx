// 2023-03-06 20:00:00

import * as React from "react";
import { GlobalStyles as MUIGlobalStyles } from "@mui/material";

export interface IGlobalStyleProps {}

export default function GlobalStyles(props: IGlobalStyleProps) {
  return (
    <MUIGlobalStyles
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        html: {
          width: "100%",
          height: "100%",
        },
        body: {
          width: "100%",
          height: "100%",
          minWidth: 900,
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
      }}
    />
  );
}
