import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import {
  ITabsRef,
  IValidatedRef,
  Layout,
  ValidatedTextField,
} from "../../components/reuse-components";
import { setAuth } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { resetPassword } from "../../utils/api";
import { CONSTRAINT } from "../../utils/enum";
import { navigate } from "../../utils/reuse-utils/tool";
import { IResultVO } from "../../utils/reuse-utils/type";
import { IAccountPO } from "../../utils/type";

export interface IPasswordMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PasswordMotionTab(props: IPasswordMotionTabProps) {
  const { tabsRef, setSuspense } = props;

  //

  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.account);

  const validatedPasswordRef = React.useRef<IValidatedRef>(null);

  const validatedVerifyPasswordRef = React.useRef<IValidatedRef>(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = React.useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  );

  const handleBack = React.useCallback(
    () => tabsRef.current.to("dashboard"),
    [tabsRef]
  );

  const handleResetPassword = React.useCallback(async () => {
    let validatedPassword = validatedPasswordRef.current;
    let validatedVerifyPassword = validatedVerifyPasswordRef.current;

    if (
      validatedPassword.handleValid() &&
      validatedVerifyPassword.handleValid()
    ) {
      setSuspense(true);

      let resultVO: IResultVO<IAccountPO> = await resetPassword({
        email: account.email,
        password: validatedPassword.value,
      });

      if (resultVO.code === 1000) {
        dispatch(setAuth({ bool: false, email: account.email }));
        navigate("/login");
      }

      setSuspense(false);
    }
  }, [setSuspense, dispatch, account]);

  return (
    <Layout variants={["width", "column", "align"]}>
      <Layout variants={["width", "column", "align"]}>
        <Layout variants={["align"]} sx={{ width: 600 }}>
          <IconButton disableRipple size="large" onClick={handleBack}>
            <Icon icon="material-symbols:chevron-left" width={24} height={24} />
          </IconButton>

          <Typography variant="h5">密码</Typography>
        </Layout>

        <Divider flexItem />
      </Layout>

      <Layout variants={["column", "align"]} sx={{ p: 3, width: 600 }}>
        <Typography
          width={"100%"}
          paddingY={2}
          gutterBottom
          color={"text.secondary"}
        >
          更改密码将在设备上注销
        </Typography>

        <Layout
          variants={["width", "column"]}
          sx={{
            px: 3,
            py: 2,
            border: "1px solid",
            borderRadius: 2,
            borderColor: "divider",
          }}
        >
          <ValidatedTextField
            validatedRef={validatedPasswordRef}
            textfieldProps={{
              id: "password",
              label: "密码",
              type: showPassword ? "text" : "password",
            }}
            constraints={CONSTRAINT["password"]}
          />

          <ValidatedTextField
            validatedRef={validatedVerifyPasswordRef}
            textfieldProps={{
              id: "verify-password",
              label: "确认",
              type: showPassword ? "text" : "password",
            }}
            constraints={CONSTRAINT["password"].concat([
              { type: "VerifyValue", valueId: "password" },
            ])}
          />

          <FormControlLabel
            control={
              <Checkbox value={showPassword} onClick={handleShowPassword} />
            }
            label="显示密码"
            sx={{ width: "100%", pl: 0.25 }}
          />

          <Layout variants={["width", "align"]}>
            <Box flex={1} />

            <Button
              disableElevation
              variant="contained"
              sx={{ mb: 1 }}
              onClick={handleResetPassword}
            >
              更改密码
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
}
