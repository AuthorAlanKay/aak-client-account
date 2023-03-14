import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import * as React from "react";
import {
  ITabsRef,
  IValidatedRef,
  Layout,
  Logo,
  ValidatedTextField,
} from "../../components/reuse-components";
import { useURLQuery } from "../../hooks/reuse-hooks/useHook";
import { setAuth } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { forgotPassword, login } from "../../utils/api";
import { CONSTRAINT } from "../../utils/enum";
import { navigate } from "../../utils/reuse-utils/tool";
import { IResultVO } from "../../utils/reuse-utils/type";
import { IAccountPO } from "../../utils/type";

export interface ILoginMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorResultVO: React.Dispatch<React.SetStateAction<IResultVO<Object>>>;
  setForgotPasswordResultVO: React.Dispatch<
    React.SetStateAction<IResultVO<string>>
  >;
}

export function LoginMotionTab(props: ILoginMotionTabProps) {
  const { tabsRef, setSuspense, setErrorResultVO, setForgotPasswordResultVO } =
    props;

  const { from } = useURLQuery();

  //

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const validatedPasswordRef = React.useRef<IValidatedRef>(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = React.useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  );

  const handleLogin = React.useCallback(async () => {
    // tabsRef.current.paginate("error");

    let validatedPassword = validatedPasswordRef.current;

    if (validatedPassword.handleValid()) {
      setSuspense(true);

      let resultVO: IResultVO<IAccountPO> = await login({
        email: auth.email,
        password: validatedPassword.value,
      });

      if (resultVO.code === 1000) {
        dispatch(setAuth({ bool: true, email: auth.email }));
        navigate(from ?? "/dashboard");
      } else {
        setErrorResultVO(resultVO);
        tabsRef.current.to("error");
      }

      setSuspense(false);
    }
  }, [auth, from, dispatch, tabsRef, setSuspense, setErrorResultVO]);

  const handleForgotPassword = React.useCallback(async () => {
    // tabsRef.current.to("verify-forgot-password");

    setSuspense(true);

    let resultVO: IResultVO<string> = await forgotPassword({
      email: auth.email,
    });

    if (resultVO.code === 1000) {
      setForgotPasswordResultVO(resultVO);
      tabsRef.current.to("verify-forgot-password");
    } else {
      setErrorResultVO(resultVO);
      tabsRef.current.to("error");
    }

    setSuspense(false);
  }, [auth, tabsRef, setSuspense, setErrorResultVO, setForgotPasswordResultVO]);

  return (
    <Layout
      variants={["width", "column", "align"]}
      sx={{ padding: "48px 40px 36px 40px" }}
    >
      <Logo variant="aak" sx={{ height: 30, width: (30 * 600) / 75 }} />

      <Typography variant="h5" gutterBottom paddingTop={2}>
        {auth.email}
      </Typography>

      <Typography gutterBottom>如需继续操作，请先验证您的身份</Typography>

      <ValidatedTextField
        validatedRef={validatedPasswordRef}
        textfieldProps={{
          id: "password",
          label: "请输入您的密码",
          type: showPassword ? "text" : "password",
        }}
        constraints={CONSTRAINT["password"]}
      />

      <FormControlLabel
        control={<Checkbox value={showPassword} onClick={handleShowPassword} />}
        label="显示密码"
        sx={{ width: "100%", pl: 0.25 }}
      />

      <Layout variants={["width", "align"]} sx={{ my: 4 }}>
        <Button onClick={handleForgotPassword}>忘记密码</Button>

        <Box flex={1} />

        <Button
          disableElevation
          variant="contained"
          sx={{ width: 96 }}
          onClick={handleLogin}
        >
          下一步
        </Button>
      </Layout>
    </Layout>
  );
}
