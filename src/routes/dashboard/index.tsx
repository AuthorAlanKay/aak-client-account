import * as React from "react";
import {
  ITabsRef,
  Layout,
  LoadingProgress,
  MotionTabs,
} from "../../components/reuse-components";
import { Footer, Header, HEADER_HEIGHT } from "../../components/re-components";
import { DashboardMotionTab } from "./DashboardMotionTab";
import { LogoutMotionTab } from "./LogoutMotionTab";
import { PasswordMotionTab } from "./PasswordMotionTab";
import { UsernameMotionTab } from "./UsernameMotionTab";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IResultVO } from "../../utils/reuse-utils/type";
import { IAccountDocumentPO, IAccountPO } from "../../utils/type";
import { getAccount } from "../../utils/api";
import { getDocument } from "../../utils/re-utils/api";
import { setAccount } from "../../redux/features/accountSlice";
import { setAccountDocument } from "../../redux/features/accountDocumentSlice";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const tabsRef = React.useRef<ITabsRef>(null);

  const [suspense, setSuspense] = React.useState(false);

  const tabSx = React.useMemo(
    () => ({ width: "100%", display: "flex", justifyContent: "center" }),
    []
  );

  React.useEffect(() => {
    let init = async () => {
      let accountResultVO: IResultVO<IAccountPO> = await getAccount(auth.email);
      let documentResultVO: IResultVO<IAccountDocumentPO> = await getDocument(
        "account",
        JSON.parse(accountResultVO.data.documentIdsStr)["account"]
      );

      dispatch(setAccount(accountResultVO.data));
      dispatch(setAccountDocument(documentResultVO.data));
    };

    let id = setTimeout(init, 64);
    return () => clearTimeout(id);
  }, [dispatch, auth]);

  const tabs = React.useMemo(
    () => [
      {
        value: "dashboard",
        tabSx,
        motionProps: { style: tabSx },
        element: (
          <DashboardMotionTab tabsRef={tabsRef} setSuspense={setSuspense} />
        ),
      },
      {
        value: "username",
        tabSx,
        motionProps: { style: tabSx },
        element: (
          <UsernameMotionTab tabsRef={tabsRef} setSuspense={setSuspense} />
        ),
      },
      {
        value: "password",
        tabSx,
        motionProps: { style: tabSx },
        element: (
          <PasswordMotionTab tabsRef={tabsRef} setSuspense={setSuspense} />
        ),
      },
      {
        value: "logout",
        tabSx,
        motionProps: { style: tabSx },
        element: (
          <LogoutMotionTab tabsRef={tabsRef} setSuspense={setSuspense} />
        ),
      },
    ],
    [tabSx]
  );

  return (
    <Layout variants={["width", "column", "align"]}>
      <Header title="账号" />

      <Layout
        variants={["width", "column", "align"]}
        sx={{ mt: HEADER_HEIGHT / 8 }}
      >
        {suspense && <LoadingProgress variant="wait" />}

        <Layout variants={["width", "column", "align"]}>
          <MotionTabs tabs={tabs} tabsRef={tabsRef} />

          <Layout variants={["center"]} sx={{ width: 256, height: 64 }}>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
}
