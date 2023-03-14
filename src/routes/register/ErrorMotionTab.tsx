import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { ITabsRef, Layout, Logo } from "../../components/reuse-components";
import { IResultVO } from "../../utils/reuse-utils/type";

export interface IErrorMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  errorResultVO: IResultVO<Object>;
}

export function ErrorMotionTab(props: IErrorMotionTabProps) {
  const { tabsRef, errorResultVO } = props;

  //

  const errorInfo = React.useMemo(() => {
    if (!errorResultVO) return "";

    return typeof errorResultVO.data === "string"
      ? errorResultVO.data
      : errorResultVO.message;
  }, [errorResultVO]);

  const handleError = React.useCallback(
    () => tabsRef.current.to("register"),
    [tabsRef]
  );

  return (
    <Layout
      variants={["width", "column", "align"]}
      sx={{ padding: "48px 40px 36px 40px" }}
    >
      <Logo variant="aak" sx={{ height: 30, width: (30 * 600) / 75 }} />

      <Typography variant="h5" gutterBottom paddingTop={2}>
        出了点问题
      </Typography>

      <Typography gutterBottom width={"100%"}>
        {errorInfo}
      </Typography>

      <Typography gutterBottom width={"100%"}>
        抱歉，出了点问题。请重试。
      </Typography>

      <Layout variants={["width", "align"]} sx={{ my: 4 }}>
        <Box flex={1} />

        <Button
          disableElevation
          variant="contained"
          sx={{ width: 96 }}
          onClick={handleError}
        >
          下一步
        </Button>
      </Layout>
    </Layout>
  );
}
