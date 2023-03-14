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
import { CONSTRAINT } from "../../utils/enum";
import { register } from "../../utils/api";
import { IResultVO } from "../../utils/reuse-utils/type";
import {
  useHandleNavigate,
  useHandleShow,
  useURLQuery,
  useURLWithQuery,
} from "../../hooks/reuse-hooks/useHook";

export interface IRegisterMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterResultVO: React.Dispatch<React.SetStateAction<IResultVO<string>>>;
  setErrorResultVO: React.Dispatch<React.SetStateAction<IResultVO<Object>>>;
}

export function RegisterMotionTab(props: IRegisterMotionTabProps) {
  const { tabsRef, setSuspense, setRegisterResultVO, setErrorResultVO } = props;

  const { from } = useURLQuery();

  const loginURL = useURLWithQuery("/login", { from });

  //

  const validatedUsernameRef = React.useRef<IValidatedRef>(null);

  const validatedEmailRef = React.useRef<IValidatedRef>(null);

  const validatedPasswordRef = React.useRef<IValidatedRef>(null);

  const validatedVerifyPasswordRef = React.useRef<IValidatedRef>(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = useHandleShow(showPassword, setShowPassword);

  const handleNavigateLogin = useHandleNavigate(loginURL);

  const handleRegister = React.useCallback(async () => {
    // tabsRef.current.to("verify-register");

    // tabsRef.current.to("error");

    let validatedUsername = validatedUsernameRef.current;
    let validatedEmail = validatedEmailRef.current;
    let validatedPassword = validatedPasswordRef.current;
    let validatedVerifyPassword = validatedVerifyPasswordRef.current;

    if (
      validatedUsername.handleValid() &&
      validatedEmail.handleValid() &&
      validatedPassword.handleValid() &&
      validatedVerifyPassword.handleValid()
    ) {
      setSuspense(true);

      let resultVO: IResultVO<string> = await register({
        username: validatedUsername.value,
        email: validatedEmail.value,
        password: validatedPassword.value,
      });

      if (resultVO.code === 1000) {
        setRegisterResultVO(resultVO);
        tabsRef.current.to("verify-register");
      } else {
        setErrorResultVO(resultVO);
        tabsRef.current.to("error");
      }

      setSuspense(false);
    }
  }, [tabsRef, setSuspense, setRegisterResultVO, setErrorResultVO]);

  return (
    <Layout
      variants={["width", "column", "align"]}
      sx={{ padding: "48px 40px 36px 40px" }}
    >
      <Logo variant="aak" sx={{ height: 30, width: (30 * 600) / 75 }} />

      <Typography variant="h5" gutterBottom paddingTop={2}>
        创建您的 AAK 帐号
      </Typography>

      <ValidatedTextField
        validatedRef={validatedUsernameRef}
        textfieldProps={{
          id: "username",
          label: "用户名",
          size: "small",
          helperText: "您可以使用字母、数字和汉字",
        }}
        constraints={CONSTRAINT["username"]}
      />

      <ValidatedTextField
        validatedRef={validatedEmailRef}
        textfieldProps={{
          id: "email",
          label: "邮箱地址",
          size: "small",
        }}
        constraints={CONSTRAINT["email"]}
      />

      <Layout variants={["width", "align"]} sx={{ gap: 2 }}>
        <ValidatedTextField
          validatedRef={validatedPasswordRef}
          textfieldProps={{
            id: "password",
            label: "密码",
            size: "small",
            type: showPassword ? "text" : "password",
            fullWidth: false,
          }}
          constraints={CONSTRAINT["password"]}
        />

        <ValidatedTextField
          validatedRef={validatedVerifyPasswordRef}
          textfieldProps={{
            id: "verify-password",
            label: "确认",
            size: "small",
            type: showPassword ? "text" : "password",
            fullWidth: false,
          }}
          constraints={CONSTRAINT["password"].concat([
            { type: "VerifyValue", valueId: "password" },
          ])}
        />
      </Layout>

      <FormControlLabel
        control={<Checkbox value={showPassword} onClick={handleShowPassword} />}
        label="显示密码"
        sx={{ width: "100%", pl: 0.25 }}
      />

      <Layout variants={["width", "align"]} sx={{ my: 4 }}>
        <Button onClick={handleNavigateLogin}>登录现有账号</Button>

        <Box flex={1} />

        <Button
          disableElevation
          variant="contained"
          sx={{ width: 96 }}
          onClick={handleRegister}
        >
          下一步
        </Button>
      </Layout>
    </Layout>
  );
}
