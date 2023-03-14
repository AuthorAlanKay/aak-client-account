// 2023-03-06 20:00:00

import { Box, BoxProps, SxProps, Theme } from "@mui/material";
import * as React from "react";

export interface ILayoutProps {
  variants?: VariantType[];
  children?: React.ReactElement | React.ReactElement[];
  sx?: SxProps<Theme>;
  boxProps?: BoxProps;
}

export function Layout(props: ILayoutProps) {
  const sx = React.useMemo(() => [].concat(props.sx), [props.sx]);

  const variants = React.useMemo(() => props.variants ?? [], [props]);

  const { boxProps, children } = props;

  //

  const variantSx = React.useMemo(() => {
    let sx = {};
    variants.forEach((variant) => Object.assign(sx, VARIANT_SX[variant]));
    return sx;
  }, [variants]);

  return (
    <Box
      sx={[{ position: "relative", display: "flex", ...variantSx }, ...sx]}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

type VariantType =
  | ""
  // height width
  | "full"
  | "height"
  | "width"
  // display
  | "hidden"
  | "block"
  | "column"
  | "wrap"
  | "center"
  | "align"
  | "justify"
  // position
  | "absolute"
  | "fixed"
  | "top"
  | "bottom"
  | "left"
  | "right";

const VARIANT_SX = {
  full: { height: "100%", width: "100%" },
  width: { width: "100%" },
  height: { height: "100%" },
  hidden: { display: "none" },
  block: { display: "block" },
  column: { flexDirection: "column" },
  wrap: { flexWrap: "wrap" },
  center: { alignItems: "center", justifyContent: "center" },
  align: { alignItems: "center" },
  justify: { justifyContent: "center" },
  absolute: { position: "absolute" },
  fixed: { position: "fixed" },
  top: { top: 0 },
  bottom: { bottom: 0 },
  left: { left: 0 },
  right: { right: 0 },
};
