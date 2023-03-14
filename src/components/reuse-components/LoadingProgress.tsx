// 2023-03-06 20:00:00

import { alpha, Box, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import * as React from "react";
import { Layout } from "./Layout";
import { Logo } from "./Logo";

export interface ILoadingProgressProps {
  /**
   * @default "init"
   */
  variant?: "init" | "wait";
}

export function LoadingProgress(props: ILoadingProgressProps) {
  const variant = React.useMemo(() => props.variant ?? "init", [props.variant]);

  //

  return (
    <Layout
      variants={["full", "column", "align", "absolute", "top", "left"]}
      sx={{ zIndex: "snackbar" }}
    >
      <LinearProgress sx={{ height: 4, width: "100%" }} />

      {variant === "wait" ? (
        <Layout
          variants={["full"]}
          sx={{ opacity: 0.5, bgcolor: "background.default" }}
        />
      ) : null}

      {variant === "init" ? (
        <Layout
          variants={["full", "center"]}
          sx={{ bgcolor: "background.default" }}
        >
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeatDelay: 1,
              repeat: Infinity,
            }}
          >
            <Logo sx={{ width: 64, height: 64 }} />
          </motion.div>

          <Box
            component={motion.div}
            animate={{
              scale: [1.2, 1, 1, 1.2, 1.2],
              rotate: [270, 0, 0, 270, 270],
              opacity: [0.25, 1, 1, 1, 0.25],
              borderRadius: ["25%", "25%", "50%", "50%", "25%"],
            }}
            transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
            sx={{
              width: 100,
              height: 100,
              borderRadius: "25%",
              position: "absolute",
              border: (theme) =>
                `solid 3px ${alpha(theme.palette.primary.dark, 0.48)}`,
            }}
          />

          <Box
            component={motion.div}
            animate={{
              scale: [1, 1.2, 1.2, 1, 1],
              rotate: [0, 270, 270, 0, 0],
              opacity: [1, 0.25, 0.25, 0.25, 1],
              borderRadius: ["25%", "25%", "50%", "50%", "25%"],
            }}
            transition={{
              ease: "linear",
              duration: 3.2,
              repeat: Infinity,
            }}
            sx={{
              width: 120,
              height: 120,
              borderRadius: "25%",
              position: "absolute",
              border: (theme) =>
                `solid 8px ${alpha(theme.palette.primary.dark, 0.48)}`,
            }}
          />
        </Layout>
      ) : null}
    </Layout>
  );
}
