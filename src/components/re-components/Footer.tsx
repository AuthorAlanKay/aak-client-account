// 2023-03-06 20:00:00

import { Box, Link, Typography } from "@mui/material";
import * as React from "react";

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
  return (
    <>
      <Typography fontSize={"12px"}>© authoralankay</Typography>

      <Box flex={1} />

      <Link
        href="https://beian.miit.gov.cn/"
        color="inherit"
        underline="hover"
        fontSize={"12px"}
      >
        鲁ICP备2022007626号-1
      </Link>
    </>
  );
}
