// 2023-03-10 12:00:00

import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/system";
import * as React from "react";
import {
  useHandleNavigate,
  useHandleOC,
  useURLWithQuery,
} from "../../hooks/reuse-hooks/useHook";
import useOffSetTop from "../../hooks/reuse-hooks/useOffSetTop";
import { setGlobal } from "../../redux/reuse-features/globalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IGlobalPO } from "../../utils/re-utils/type";
import { ACCOUNT_CLIENT, APPS } from "../../utils/reuse-utils/enum";
import { navigate } from "../../utils/reuse-utils/tool";
import { IResultVO } from "../../utils/reuse-utils/type";
import { Layout, Logo } from "../reuse-components";

export const HEADER_HEIGHT = 64;

export interface IHeaderProps {
  title?: string;
}

export function Header(props: IHeaderProps) {
  const { title } = props;

  const apiURL = useURLWithQuery(ACCOUNT_CLIENT + "/api", {
    from: window.location.href,
  });

  const loginURL = useURLWithQuery(ACCOUNT_CLIENT + "/login", {
    from: window.location.href,
  });

  //

  const dispatch = useAppDispatch();

  const appAnchorEl = React.useRef(null);

  const accountAnchorEl = React.useRef(null);

  const isOffset = useOffSetTop(HEADER_HEIGHT);

  const { isAuth, photo, email, username } = useAppSelector(
    (state) => state.global
  );

  const [openAppPopover, setOpenAppPopover] = React.useState(false);

  const [handleOpenAppPopover, handleCloseAppPopover] =
    useHandleOC(setOpenAppPopover);

  const [openAccountPopover, setOpenAccountPopover] = React.useState(false);

  const [handleOpenAccountPopover, handleCloseAccountPopover] = useHandleOC(
    setOpenAccountPopover
  );

  const handleNavigateLogin = useHandleNavigate(loginURL);

  const handleNavigateDashboard = useHandleNavigate(
    ACCOUNT_CLIENT + "/dashboard",
    { top: true }
  );

  const handleExit = React.useCallback(() => {
    (document.getElementById("api") as HTMLIFrameElement).contentWindow.document
      .getElementById("api-exit-button")
      .click();
  }, []);

  React.useEffect(() => {
    const handleMessage = async function (e: MessageEvent<any>) {
      console.log(e.origin, e.data, !!(e.data.code && e.data.message));

      if (e.data.code && e.data.message) {
        let resultVO = e.data as IResultVO<IGlobalPO>;

        dispatch(setGlobal(resultVO.data));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  return (
    <>
      <Layout
        variants={["align", "fixed", "top", "left", "right"]}
        sx={{
          px: 2,
          zIndex: "appBar",
          height: HEADER_HEIGHT,
          backgroundColor: (theme) =>
            alpha(theme.palette.background.paper, 0.96),
          transition: "box-shadow 0.2s ease-in-out",
          ...(isOffset && { boxShadow: (theme) => theme.shadows[2] }),
        }}
      >
        {title ? (
          <>
            <Logo variant="aak" sx={{ height: 24, width: (24 * 600) / 75 }} />

            <Typography fontSize={"20px"}>{title}</Typography>
          </>
        ) : null}

        <Box flex={1} />

        <IconButton
          sx={{ mr: 1.25 }}
          ref={appAnchorEl}
          onClick={handleOpenAppPopover}
        >
          <Icon icon="material-symbols:apps" />
        </IconButton>

        {!isAuth ? (
          <Button
            disableElevation
            variant="contained"
            onClick={handleNavigateLogin}
          >
            登录
          </Button>
        ) : null}

        {isAuth ? (
          <IconButton
            ref={accountAnchorEl}
            sx={{ width: 40, height: 40 }}
            onClick={handleOpenAccountPopover}
          >
            <Avatar alt={username} src={photo} sx={{ width: 32, height: 32 }} />
          </IconButton>
        ) : null}
      </Layout>

      <Layout variants={["hidden"]}>
        <iframe id="api" title="api" src={apiURL} />
      </Layout>

      <Popover
        open={openAppPopover}
        onClose={handleCloseAppPopover}
        anchorEl={appAnchorEl.current}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <Layout
          variants={["block"]}
          sx={{ width: 300, height: 350, px: "15px", py: "10px" }}
        >
          {APPS.map((app, index) => (
            <Button
              key={index}
              sx={{ width: 80, height: 80, p: 0, m: "5px", borderRadius: 2 }}
              onClick={() => navigate(app.url)}
            >
              <Layout variants={["full", "column", "center"]} sx={{ gap: 0.5 }}>
                <img src={app.favicon} alt={app.name} width={42} height={42} />

                <Typography
                  variant="body2"
                  color="initial"
                  gutterBottom
                  fontSize={"12px"}
                >
                  {app.name}
                </Typography>
              </Layout>
            </Button>
          ))}
        </Layout>
      </Popover>

      <Popover
        open={openAccountPopover}
        onClose={handleCloseAccountPopover}
        anchorEl={appAnchorEl.current}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <Layout
          variants={["column", "center"]}
          sx={{ width: 350, height: 300 }}
        >
          <Avatar alt={username} src={photo} sx={{ width: 60, height: 60 }} />

          <Layout
            variants={["column", "align"]}
            sx={{ mt: 0.75, mb: 0.25, height: 58 }}
          >
            <Typography variant="h6">{username}</Typography>

            <Typography gutterBottom color={"text.secondary"} fontSize={"14px"}>
              {email}
            </Typography>
          </Layout>

          <Button
            variant="contained"
            disableElevation
            sx={{ borderRadius: 1, my: 0.75 }}
            onClick={handleNavigateDashboard}
          >
            管理您的 aak 账号
          </Button>

          <Button
            variant="contained"
            disableElevation
            sx={{ borderRadius: 1, my: 0.75 }}
            onClick={handleExit}
          >
            退出登录
          </Button>
        </Layout>
      </Popover>
    </>
  );
}
