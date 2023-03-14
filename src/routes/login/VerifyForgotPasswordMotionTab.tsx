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
import { useAppDispatch } from "../../redux/store";
import { verifyForgotPassword } from "../../utils/api";
import { CONSTRAINT } from "../../utils/enum";
import { IResultVO } from "../../utils/reuse-utils/type";
import { IAccountPO } from "../../utils/type";

export interface IVerifyForgotPasswordMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPasswordResultVO: IResultVO<string>;
  setErrorResultVO: React.Dispatch<React.SetStateAction<IResultVO<Object>>>;
}

export function VerifyForgotPasswordMotionTab(
  props: IVerifyForgotPasswordMotionTabProps
) {
  const { tabsRef, setSuspense, forgotPasswordResultVO, setErrorResultVO } =
    props;

  //

  const dispatch = useAppDispatch();

  const validatedCaptchaRef = React.useRef<IValidatedRef>(null);

  const handleVerifyForgotPassword = React.useCallback(async () => {
    // tabsRef.current.to("welcome-back");

    let validatedCaptcha = validatedCaptchaRef.current;

    if (validatedCaptcha.handleValid()) {
      setSuspense(true);

      let resultVO: IResultVO<IAccountPO> = await verifyForgotPassword(
        validatedCaptcha.value
      );

      if (resultVO.code === 1000) {
        dispatch(setAuth({ bool: true, email: resultVO.data.email }));
        tabsRef.current.to("welcome-back");
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

      <Typography variant="h5" paddingTop={2}>
        账号恢复
      </Typography>

      <Typography gutterBottom>
        为了保护您的帐号安全，AAK 希望确认是您本人在尝试登录
      </Typography>

      <Typography gutterBottom width={"100%"}>
        {forgotPasswordResultVO?.data}
      </Typography>

      <ValidatedTextField
        validatedRef={validatedCaptchaRef}
        textfieldProps={{ id: "captcha", label: "验证码" }}
        constraints={CONSTRAINT["captcha"]}
      />

      <Layout variants={["width", "align"]} sx={{ my: 4 }}>
        <Box flex={1} />

        <Button
          disableElevation
          variant="contained"
          sx={{ width: 96 }}
          onClick={handleVerifyForgotPassword}
        >
          下一步
        </Button>
      </Layout>
    </Layout>
  );
}
