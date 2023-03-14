import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { ITabsRef, Layout, Logo } from "../../components/reuse-components";
import {
  useHandleNavigate,
  useURLQuery,
} from "../../hooks/reuse-hooks/useHook";

export interface IWelcomeBackMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
}

export function WelcomeBackMotionTab(props: IWelcomeBackMotionTabProps) {
  const { tabsRef } = props;

  const { from } = useURLQuery();

  //

  const handleToResetPasswordTab = React.useCallback(
    () => tabsRef.current.to("reset-password"),
    [tabsRef]
  );

  const handleNavigateNext = useHandleNavigate(from ?? "/dashboard");

  return (
    <Layout
      variants={["width", "column", "align"]}
      sx={{ padding: "48px 40px 36px 40px" }}
    >
      <Logo variant="aak" sx={{ height: 30, width: (30 * 600) / 75 }} />

      <Typography variant="h5" gutterBottom paddingTop={2}>
        欢迎回来
      </Typography>

      <Typography gutterBottom>
        如果您忘记了密码，现在就可以更改密码。
      </Typography>

      <Layout variants={["width", "align"]} sx={{ my: 4 }}>
        <Button onClick={handleToResetPasswordTab}>更改密码</Button>

        <Box flex={1} />

        <Button
          disableElevation
          variant="contained"
          sx={{ width: 96 }}
          onClick={handleNavigateNext}
        >
          下一步
        </Button>
      </Layout>
    </Layout>
  );
}
