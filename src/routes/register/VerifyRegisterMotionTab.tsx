import { Box, Button, Typography } from "@mui/material";
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
import { useAppDispatch } from "../../redux/store";
import { verifyRegister } from "../../utils/api";
import { CONSTRAINT } from "../../utils/enum";
import { navigate } from "../../utils/reuse-utils/tool";
import { IResultVO } from "../../utils/reuse-utils/type";
import { IAccountPO } from "../../utils/type";

export interface IVerifyRegisterMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
  registerResultVO: IResultVO<string>;
  setErrorResultVO: React.Dispatch<React.SetStateAction<IResultVO<Object>>>;
}

export function VerifyRegisterMotionTab(props: IVerifyRegisterMotionTabProps) {
  const { tabsRef, setSuspense, registerResultVO, setErrorResultVO } = props;

  const { from } = useURLQuery();

  //

  const dispatch = useAppDispatch();

  const validatedCaptchaRef = React.useRef<IValidatedRef>(null);

  const handleVerifyRegister = React.useCallback(async () => {
    // tabsRef.current.to("error");

    let validatedCaptcha = validatedCaptchaRef.current;

    if (validatedCaptcha.handleValid()) {
      setSuspense(true);

      let resultVO: IResultVO<IAccountPO> = await verifyRegister(
        validatedCaptcha.value
      );

      if (resultVO.code === 1000) {
        dispatch(setAuth({ bool: true, email: resultVO.data.email }));
        navigate(from ?? "/dashboard");
      } else {
        setErrorResultVO(resultVO);
        tabsRef.current.to("error");
      }

      setSuspense(false);
    }
  }, [dispatch, from, tabsRef, setSuspense, setErrorResultVO]);

  return (
    <Layout
      variants={["width", "column", "align"]}
      sx={{ padding: "48px 40px 36px 40px" }}
    >
      <Logo variant="aak" sx={{ height: 30, width: (30 * 600) / 75 }} />

      <Typography variant="h5" gutterBottom paddingTop={2}>
        创建您的 AAK 帐号
      </Typography>

      <Typography width={"100%"} gutterBottom>
        为了保护您的帐号安全，AAK 希望确认是您本人在尝试注册
      </Typography>

      <Typography width={"100%"} gutterBottom>
        {registerResultVO?.data}
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
          onClick={handleVerifyRegister}
        >
          下一步
        </Button>
      </Layout>
    </Layout>
  );
}
