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
import { RegisterMotionTab } from "./RegisterMotionTab";
import { VerifyRegisterMotionTab } from "./VerifyRegisterMotionTab";

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  const tabsRef = React.useRef<ITabsRef>(null);

  const [suspense, setSuspense] = React.useState(false);

  const [errorResultVO, setErrorResultVO] =
    React.useState<IResultVO<Object>>(null);

  const [registerResultVO, setRegisterResultVO] =
    React.useState<IResultVO<string>>(null);

  const tabs = React.useMemo(
    () => [
      {
        value: "register",
        element: (
          <RegisterMotionTab
            tabsRef={tabsRef}
            setSuspense={setSuspense}
            setRegisterResultVO={setRegisterResultVO}
            setErrorResultVO={setErrorResultVO}
          />
        ),
        from: { x: 0, height: ERROR_MOTION_TAB_HEIGHT },
        to: { height: REGISTER_MOTION_TAB_HEIGHT },
        tabSx: { width: WIDTH },
      },
      {
        value: "verify-register",
        element: (
          <VerifyRegisterMotionTab
            tabsRef={tabsRef}
            setSuspense={setSuspense}
            registerResultVO={registerResultVO}
            setErrorResultVO={setErrorResultVO}
          />
        ),
        tabSx: { width: WIDTH, height: VERIFY_REGISTER_MOTION_TAB_HEIGHT },
      },
      {
        value: "error",
        element: (
          <ErrorMotionTab tabsRef={tabsRef} errorResultVO={errorResultVO} />
        ),
        from: { x: 0, height: REGISTER_MOTION_TAB_HEIGHT },
        to: { height: ERROR_MOTION_TAB_HEIGHT },
        tabSx: { width: WIDTH },
      },
    ],
    [errorResultVO, registerResultVO]
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

const REGISTER_MOTION_TAB_HEIGHT = 530;

const VERIFY_REGISTER_MOTION_TAB_HEIGHT = 530;

const ERROR_MOTION_TAB_HEIGHT = 360;
