// 2023-03-06 20:00:00

import { TabContext, TabPanel } from "@mui/lab";
import { SxProps, Theme } from "@mui/material";
import { motion, MotionProps } from "framer-motion";
import * as React from "react";

export interface ITabsRef {
  to: (value: string) => void;
}

export interface IMotionTabsProps {
  tabs?: IMotionTabVO[];
  tabsRef?: React.MutableRefObject<ITabsRef>;
}

export function MotionTabs(props: IMotionTabsProps) {
  const { tabsRef } = props;

  const tabs = React.useMemo(() => props.tabs ?? [], [props.tabs]);

  //

  const values = React.useMemo(() => tabs.map((i) => i.value), [tabs]);

  const [[page, direction], setPage] = React.useState([0, 0]);

  const animateFrom = React.useCallback(
    (
      direction: number,
      tabFrom?: undefined | ((direction: number) => {}) | {}
    ) => {
      let from = { x: direction > 0 ? 1000 : -1000, opacity: 0 };
      if (!tabFrom) return from;
      if (typeof tabFrom === "function")
        return Object.assign(from, tabFrom(direction));
      if (typeof tabFrom === "object") return Object.assign(from, tabFrom);
    },
    []
  );

  const animateTo = React.useCallback(
    (
      direction: number,
      tabTo?: undefined | ((direction: number) => {}) | {}
    ) => {
      let to = { x: 0, opacity: 1 };
      if (!tabTo) return to;
      if (typeof tabTo === "function")
        return Object.assign(to, tabTo(direction));
      if (typeof tabTo === "object") return Object.assign(to, tabTo);
    },
    []
  );

  const to = React.useCallback(
    (value: string) => {
      let newDirection = values.indexOf(value) - page;
      setPage([page + newDirection, newDirection]);
    },
    [values, page]
  );

  React.useEffect(() => {
    if (tabsRef) tabsRef.current = { to };
  }, [tabsRef, to]);

  if (tabs.length === 0) return;

  return (
    <TabContext value={values[page]}>
      {tabs.map((tab: IMotionTabVO, index: number) => (
        <TabPanel
          key={index}
          value={tab.value}
          sx={[{ p: 0, overflow: "hidden" }, ...[].concat(tab.tabSx)]}
        >
          <motion.div
            custom={direction}
            initial={direction === 0 ? "to" : "from"}
            animate="to"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            variants={{
              from: animateFrom(direction, tab.from),
              to: animateTo(direction, tab.to),
            }}
            {...tab.motionProps}
          >
            {tab.element}
          </motion.div>
        </TabPanel>
      ))}
    </TabContext>
  );
}

interface IMotionTabVO {
  value: string;
  element?: React.ReactElement;
  from?: {};
  to?: {};
  tabSx?: SxProps<Theme>;
  motionProps?: MotionProps;
}

//     variants: {
//       from: (direction: number) => ({
//         x: direction > 0 ? 1000 : -1000,
//         opacity: 0,
//       }),
//       to: {
//         x: 0,
//         opacity: 1,
//       },
//     },
