import { Icon } from "@iconify/react";
import { Divider, IconButton, Typography } from "@mui/material";
import * as React from "react";
import { ITabsRef, Layout } from "../../components/reuse-components";

export interface ILogoutMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LogoutMotionTab(props: ILogoutMotionTabProps) {
  const { tabsRef, setSuspense } = props;

  //

  const handleBack = React.useCallback(
    () => tabsRef.current.to("dashboard"),
    [tabsRef]
  );

  return (
    <Layout variants={["width", "column", "align"]}>
      <Layout variants={["width", "column", "align"]}>
        <Layout variants={["align"]} sx={{ width: 800 }}>
          <IconButton disableRipple size="large" onClick={handleBack}>
            <Icon icon="material-symbols:chevron-left" width={24} height={24} />
          </IconButton>

          <Typography variant="h5">注销</Typography>
        </Layout>

        <Divider flexItem />
      </Layout>
    </Layout>
  );
}
