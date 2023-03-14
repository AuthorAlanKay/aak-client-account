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
import {
  useHandleNavigate,
  useURLQuery,
} from "../../hooks/reuse-hooks/useHook";
import { setAuth } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { resetPassword } from "../../utils/api";
import { CONSTRAINT } from "../../utils/enum";
import { navigate } from "../../utils/reuse-utils/tool";
import { IResultVO } from "../../utils/reuse-utils/type";
import { IAccountPO } from "../../utils/type";

export interface IResetPasswordMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorResultVO: React.Dispatch<React.SetStateAction<IResultVO<Object>>>;
}

export function ResetPasswordMotionTab(props: IResetPasswordMotionTabProps) {
  const { tabsRef, setSuspense, setErrorResultVO } = props;

  const { from } = useURLQuery();

  //

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const validatedResetPasswordRef = React.useRef<IValidatedRef>(null);

  const validatedVerifyResetPasswordRef = React.useRef<IValidatedRef>(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = React.useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  );

  const handlePass = useHandleNavigate(from ?? "/dashboard");

  const handleResetPassword = React.useCallback(async () => {
    // tabsRef.current.paginate("error");

    let validatedResetPassword = validatedResetPasswordRef.current;
    let validatedVerifyResetPassword = validatedVerifyResetPasswordRef.current;

    if (
      validatedResetPassword.handleValid() &&
      validatedVerifyResetPassword.handleValid()
    ) {
      setSuspense(true);

      let resultVO: IResultVO<IAccountPO> = await resetPassword({
        email: auth.email,
        password: validatedResetPassword.value,
      });

      if (resultVO.code === 1000) {
        dispatch(setAuth({ bool: true, email: resultVO.data.email }));
        navigate(from ?? "/dashboard");
      } else {
        setErrorResultVO(resultVO);
        tabsRef.current.to("error");
      }

      setSuspense(false);
    }
  }, [auth, from, dispatch, tabsRef, setSuspense, setErrorResultVO]);

  return (
    <Layout
      variants={["width", "column", "align"]}
      sx={{ padding: "48px 40px 36px 40px" }}
    >
      <Logo variant="aak" sx={{ height: 30, width: (30 * 600) / 75 }} />

      <Typography variant="h5" paddingTop={2}>
        更改密码
      </Typography>

      <Typography gutterBottom width={"100%"}>
        创建安全系数高的密码，一个您不会在其他网站上使用且安全系数高的新密码
      </Typography>

      <ValidatedTextField
        validatedRef={validatedResetPasswordRef}
        textfieldProps={{
          id: "reset-password",
          label: "设置密码",
          type: showPassword ? "text" : "password",
        }}
        constraints={CONSTRAINT["password"]}
      />

      <ValidatedTextField
        validatedRef={validatedVerifyResetPasswordRef}
        textfieldProps={{
          id: "verify-reset-password",
          label: "确认",
          type: showPassword ? "text" : "password",
        }}
        constraints={CONSTRAINT["password"].concat([
          { type: "VerifyValue", valueId: "reset-password" },
        ])}
      />

      <FormControlLabel
        control={<Checkbox value={showPassword} onClick={handleShowPassword} />}
        label="显示密码"
        sx={{ width: "100%", pl: 0.25 }}
      />

      <Layout variants={["width", "align"]} sx={{ my: 4 }}>
        <Button onClick={handlePass}>跳过</Button>

        <Box flex={1} />

        <Button
          disableElevation
          variant="contained"
          sx={{ width: 96 }}
          onClick={handleResetPassword}
        >
          下一步
        </Button>
      </Layout>
    </Layout>
  );
}
