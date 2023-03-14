import { Icon } from "@iconify/react";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import * as React from "react";
import {
  ITabsRef,
  IValidatedRef,
  Layout,
  ValidatedTextField,
} from "../../components/reuse-components";
import { setAccountDocument } from "../../redux/features/accountDocumentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { CONSTRAINT } from "../../utils/enum";
import { setDocument } from "../../utils/re-utils/api";
import { IAccountDocumentPO } from "../../utils/type";
import { IResultVO } from "../../utils/reuse-utils/type";

export interface IUsernameMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UsernameMotionTab(props: IUsernameMotionTabProps) {
  const { tabsRef, setSuspense } = props;

  //

  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.account);

  const accountDocument = useAppSelector((state) => state.accountDocument);

  const validatedUsernameRef = React.useRef<IValidatedRef>(null);

  const handleBack = React.useCallback(
    () => tabsRef.current.to("dashboard"),
    [tabsRef]
  );

  const handleResetUsername = React.useCallback(async () => {
    let validatedUsername = validatedUsernameRef.current;

    if (validatedUsername.handleValid()) {
      setSuspense(true);

      let resultVO: IResultVO<IAccountDocumentPO> = await setDocument({
        collection: "account",
        documentId: JSON.parse(account.documentIdsStr)["account"],
        key: "username",
        value: validatedUsername.value,
      });

      if (resultVO.code === 1000) {
        dispatch(setAccountDocument(resultVO.data));
        tabsRef.current.to("dashboard");
      }

      setSuspense(false);
    }
  }, [tabsRef, setSuspense, dispatch, account]);

  return (
    <Layout variants={["width", "column", "align"]}>
      <Layout variants={["width", "column", "align"]}>
        <Layout variants={["align"]} sx={{ width: 600 }}>
          <IconButton disableRipple size="large" onClick={handleBack}>
            <Icon icon="material-symbols:chevron-left" width={24} height={24} />
          </IconButton>

          <Typography variant="h5">用户名</Typography>
        </Layout>

        <Divider flexItem />
      </Layout>

      <Layout variants={["column", "align"]} sx={{ p: 3, width: 600 }}>
        <Layout
          variants={["width", "column"]}
          sx={{
            p: 3,
            border: "1px solid",
            borderRadius: 2,
            borderColor: "divider",
          }}
        >
          <Typography gutterBottom color={"text.secondary"}>
            对您的昵称所做的更改将反映到您的 AAK 帐号中
          </Typography>

          <ValidatedTextField
            placeholder={accountDocument.username}
            validatedRef={validatedUsernameRef}
            textfieldProps={{
              id: "username",
              label: "用户名",
              helperText: "您可以使用字母、数字和汉字",
            }}
            constraints={CONSTRAINT["username"]}
          />

          <Layout variants={["column"]} sx={{ my: 2 }}>
            <Typography gutterBottom>谁能看到您的用户名？</Typography>

            <Typography
              color={"text.secondary"}
              width={"70%"}
              sx={{ display: "flex", alignItems: "start", gap: 1 }}
            >
              <Icon icon={"ic:outline-people"} width={24} height={24} />
              任何人在与您联系或查看您在 AAK 服务中创建的内容时均能看到此信息
            </Typography>
          </Layout>

          <Layout variants={["width", "align"]}>
            <Box flex={1} />

            <Button onClick={handleBack}>取消</Button>

            <Button
              disableElevation
              variant="contained"
              sx={{ ml: 1 }}
              onClick={handleResetUsername}
            >
              保存
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
}
