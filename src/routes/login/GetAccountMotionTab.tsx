import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import {
  ITabsRef,
  IValidatedRef,
  Layout,
  Logo,
  ValidatedTextField,
} from "../../components/reuse-components";
import { setAuth } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { CONSTRAINT } from "../../utils/enum";
import { getAccount } from "../../utils/api";
import { IResultVO } from "../../utils/reuse-utils/type";
import { IAccountPO } from "../../utils/type";
import {
  useHandleNavigate,
  useURLQuery,
  useURLWithQuery,
} from "../../hooks/reuse-hooks/useHook";

// variants={["width", "column", "align"]}
// sx={{ padding: "48px 40px 36px 40px" }}

export interface IGetAccountMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorResultVO: React.Dispatch<React.SetStateAction<IResultVO<Object>>>;
}

export function GetAccountMotionTab(props: IGetAccountMotionTabProps) {
  const { tabsRef, setSuspense, setErrorResultVO } = props;

  const { from } = useURLQuery();

  const registerURL = useURLWithQuery("/register", { from });

  //

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const validatedEmailRef = React.useRef<IValidatedRef>(null);

  const hanldeNavigateRegister = useHandleNavigate(registerURL);

  const handleGetAccount = React.useCallback(async () => {
    // tabsRef.current.to("verify-forgot-password");

    let validatedEmail = validatedEmailRef.current;

    if (validatedEmail.handleValid(validatedEmail.value)) {
      setSuspense(true);

      let resultVO: IResultVO<IAccountPO> = await getAccount(
        validatedEmail.value
      );

      if (resultVO.code === 1000) {
        dispatch(setAuth({ bool: false, email: validatedEmail.value }));
        tabsRef.current.to("login");
      } else {
        setErrorResultVO(resultVO);
        tabsRef.current.to("error");
      }

      setSuspense(false);
    }
  }, [dispatch, tabsRef, setSuspense, setErrorResultVO]);

  return (
    <Layout
      variants={["width", "column", "align"]}
      sx={{ padding: "48px 40px 36px 40px" }}
    >
      <Logo variant="aak" sx={{ height: 30, width: (30 * 600) / 75 }} />

      <Typography variant="h5" gutterBottom paddingTop={2}>
        登录
      </Typography>

      <Typography gutterBottom>使用您的 AAK 账号</Typography>

      <ValidatedTextField
        placeholder={auth.email}
        validatedRef={validatedEmailRef}
        textfieldProps={{ id: "email", label: "邮箱地址" }}
        constraints={CONSTRAINT["email"]}
      />

      <Layout variants={["width", "align"]} sx={{ my: 4 }}>
        <Button onClick={hanldeNavigateRegister}>创建账号</Button>

        <Box flex={1} />

        <Button
          disableElevation
          variant="contained"
          sx={{ width: 96 }}
          onClick={handleGetAccount}
        >
          下一步
        </Button>
      </Layout>
    </Layout>
  );
}
