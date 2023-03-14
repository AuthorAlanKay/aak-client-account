import * as React from "react";
import {
  ITabsRef,
  Layout,
  LoadingProgress,
  MotionTabs,
} from "../../components/reuse-components";
import { Footer } from "../../components/re-components";
import { IResultVO } from "../../utils/reuse-utils/type";
import { ErrorMotionTab } from "./ErrorMotionTab";
import { GetAccountMotionTab } from "./GetAccountMotionTab";
import { LoginMotionTab } from "./LoginMotionTab";
import { ResetPasswordMotionTab } from "./ResetPasswordMotionTab";
import { VerifyForgotPasswordMotionTab } from "./VerifyForgotPasswordMotionTab";
import { WelcomeBackMotionTab } from "./WelcomeBackMotionTab";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const tabsRef = React.useRef<ITabsRef>(null);

  const [suspense, setSuspense] = React.useState(false);

  const [errorResultVO, setErrorResultVO] =
    React.useState<IResultVO<Object>>(null);

  const [forgotPasswordResultVO, setForgotPasswordResultVO] =
    React.useState<IResultVO<string>>(null);

  const tabs = React.useMemo(
    () => [
      {
        value: "get-account",
        element: (
          <GetAccountMotionTab
            tabsRef={tabsRef}
            setSuspense={setSuspense}
            setErrorResultVO={setErrorResultVO}
          />
        ),
        tabSx: { width: WIDTH, height: GET_ACCOUNT_MOTION_TAB_HEIGHT },
      },
      {
        value: "login",
        element: (
          <LoginMotionTab
            tabsRef={tabsRef}
            setSuspense={setSuspense}
            setErrorResultVO={setErrorResultVO}
            setForgotPasswordResultVO={setForgotPasswordResultVO}
          />
        ),
        tabSx: { width: WIDTH, height: LOGIN_MOTION_TAB_HEIGHT },
      },
      {
        value: "verify-forgot-password",
        element: (
          <VerifyForgotPasswordMotionTab
            tabsRef={tabsRef}
            setSuspense={setSuspense}
            setErrorResultVO={setErrorResultVO}
            forgotPasswordResultVO={forgotPasswordResultVO}
          />
        ),
        from: { x: 0, height: LOGIN_MOTION_TAB_HEIGHT },
        to: { height: VERIFY_FORGOT_PASSWORD_MOTION_TAB_HEIGHT },
        tabSx: { width: WIDTH },
      },
      {
        value: "welcome-back",
        element: <WelcomeBackMotionTab tabsRef={tabsRef} />,
        from: { x: 0, height: VERIFY_FORGOT_PASSWORD_MOTION_TAB_HEIGHT },
        to: { height: WELCOME_BACK_MOTION_TAB_HEIGHT },
        tabSx: { width: WIDTH },
      },
      {
        value: "reset-password",
        element: (
          <ResetPasswordMotionTab
            tabsRef={tabsRef}
            setErrorResultVO={setErrorResultVO}
            setSuspense={setSuspense}
          />
        ),
        from: { x: 0, height: WELCOME_BACK_MOTION_TAB_HEIGHT },
        to: { height: RESET_PASSWORD_MOTION_TAB_HEIGHT },
        tabSx: { width: WIDTH },
      },
      {
        value: "error",
        element: (
          <ErrorMotionTab tabsRef={tabsRef} errorResultVO={errorResultVO} />
        ),
        from: (direction: number) => ({
          x: direction >= 3 ? 1000 : 0,
          height: ERROR_MOTION_TAB_HEIGHT,
          ...(direction === 1 && { height: RESET_PASSWORD_MOTION_TAB_HEIGHT }),
          ...(direction === 3 && {
            height: VERIFY_FORGOT_PASSWORD_MOTION_TAB_HEIGHT,
          }),
        }),
        to: { height: ERROR_MOTION_TAB_HEIGHT },
        tabSx: { width: WIDTH },
      },
    ],
    [errorResultVO, forgotPasswordResultVO]
  );

  return (
    <Layout variants={["full", "column", "center"]}>
      <Layout
        sx={{ border: "1px solid", borderRadius: 2, borderColor: "divider" }}
      >
        {suspense && <LoadingProgress variant="wait" />}

        <MotionTabs tabs={tabs} tabsRef={tabsRef} />
      </Layout>

      <Layout variants={["center"]} sx={{ width: WIDTH, height: 64 }}>
        <Footer />
      </Layout>
    </Layout>
  );
}

const WIDTH = 450;

const GET_ACCOUNT_MOTION_TAB_HEIGHT = 420;

const LOGIN_MOTION_TAB_HEIGHT = 420;

const VERIFY_FORGOT_PASSWORD_MOTION_TAB_HEIGHT = 450;

const WELCOME_BACK_MOTION_TAB_HEIGHT = 360;

const RESET_PASSWORD_MOTION_TAB_HEIGHT = 530;

const ERROR_MOTION_TAB_HEIGHT = 420;
