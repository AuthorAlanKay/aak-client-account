import { Icon } from "@iconify/react";
import { Button, ButtonGroup, Typography, useTheme } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { AvatarButton } from "../../components/AvatarButton";
import { PhotoDialog } from "../../components/PhotoDialog";
import { ITabsRef, Layout } from "../../components/reuse-components";
import { useHandleOC } from "../../hooks/reuse-hooks/useHook";
import { setAccountDocument } from "../../redux/features/accountDocumentSlice";
import { setGlobal } from "../../redux/reuse-features/globalSlice";
import { useAppSelector } from "../../redux/store";
import { setDocument } from "../../utils/re-utils/api";
import { IResultVO } from "../../utils/reuse-utils/type";
import { IAccountDocumentPO } from "../../utils/type";

export interface IDashboardMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DashboardMotionTab(props: IDashboardMotionTabProps) {
  const { tabsRef, setSuspense } = props;

  //

  const theme = useTheme();

  const dispatch = useDispatch();

  const account = useAppSelector((state) => state.account);

  const accountDocument = useAppSelector((state) => state.accountDocument);

  const [openPhotoDialog, setOpenPhotoDialog] = React.useState(false);

  const [handleOpenPhotoDialog, handleClosePhotoDialog] =
    useHandleOC(setOpenPhotoDialog);

  const handleToUsernameTab = React.useCallback(
    () => tabsRef.current.to("username"),
    [tabsRef]
  );

  const handleToPasswordTab = React.useCallback(
    () => tabsRef.current.to("password"),
    [tabsRef]
  );

  const handleToLogoutTab = React.useCallback(
    () => tabsRef.current.to("logout"),
    [tabsRef]
  );

  const hanldeToggleTheme = React.useCallback(async () => {
    setSuspense(true);

    let theme: "light" | "dark" =
      accountDocument.theme === "dark" ? "light" : "dark";

    let resultVO: IResultVO<IAccountDocumentPO> = await setDocument({
      collection: "account",
      documentId: JSON.parse(account.documentIdsStr)["account"],
      key: "theme",
      value: theme,
    });

    if (resultVO.code === 1000) {
      dispatch(setGlobal({ theme }));
      dispatch(setAccountDocument(resultVO.data));
    }

    setSuspense(false);
  }, [setSuspense, account, dispatch, accountDocument]);

  return (
    <>
      <Layout variants={["column", "align"]} sx={{ p: 3, width: 800 }}>
        <Layout variants={["width", "column", "center"]}>
          <AvatarButton
            size={96}
            handleOpenPhotoDialog={handleOpenPhotoDialog}
          />

          <Typography variant="h5" fontSize={"28px"} paddingY={2}>
            欢迎使用，{accountDocument.username}
          </Typography>
        </Layout>

        <Layout variants={["width", "column"]} sx={{ mt: 6 }}>
          <Layout variants={["column"]}>
            <Typography gutterBottom variant="h5">
              您在 AAK 服务中的个人资料信息
            </Typography>

            <Typography gutterBottom color={"text.secondary"}>
              个人信息和管理它的选项。
              您可以让其他人看到其中的某些信息，例如您的详细联系信息，以便他们可以轻松联系到您。
              您还可以查看个人资料的摘要
            </Typography>
          </Layout>

          <Layout
            variants={["column"]}
            sx={{
              my: 1,
              border: "1px solid",
              borderRadius: 2,
              borderColor: "divider",
            }}
          >
            <Layout variants={["column"]} sx={{ p: "16px 16px 8px 16px" }}>
              <Typography gutterBottom variant="h6">
                基本资料
              </Typography>

              <Typography gutterBottom variant="body2" color={"text.secondary"}>
                某些信息可能对使用 AAK 服务的其他人可见。
              </Typography>
            </Layout>

            <ButtonGroup
              disableElevation
              orientation="vertical"
              variant="text"
              color="inherit"
            >
              <Button sx={{ p: 2 }} onClick={handleOpenPhotoDialog}>
                <Typography width={196} align={"left"} color={"text.secondary"}>
                  照片
                </Typography>

                <Typography flex={1} align={"left"} color={"text.secondary"}>
                  照片有助于个性化您的账号
                </Typography>

                <AvatarButton isButton={false} size={56} />
              </Button>

              <Button sx={{ p: 2 }} disabled>
                <Typography width={196} align={"left"} color={"text.secondary"}>
                  邮箱
                </Typography>

                <Typography
                  textTransform={"none"}
                  flex={1}
                  align={"left"}
                  color={"text.secondary"}
                >
                  {account.email}
                </Typography>
              </Button>

              <Button sx={{ p: 2 }} onClick={handleToUsernameTab}>
                <Typography width={196} align={"left"} color={"text.secondary"}>
                  用户名
                </Typography>

                <Typography
                  textTransform={"none"}
                  flex={1}
                  textAlign={"left"}
                  color={"text.primary"}
                >
                  {accountDocument.username}
                </Typography>

                <Icon
                  icon={"material-symbols:chevron-right-rounded"}
                  width={24}
                  height={24}
                  color={theme.palette.text.primary}
                />
              </Button>
            </ButtonGroup>
          </Layout>
        </Layout>

        <Layout variants={["width", "column"]} sx={{ mt: 6 }}>
          <Layout variants={["column"]}>
            <Typography gutterBottom variant="h5">
              AAK 服务的其他信息和偏好
            </Typography>

            <Typography gutterBottom color={"text.secondary"}>
              验证您身份的方法和网络设置
            </Typography>
          </Layout>

          <Layout
            variants={["column"]}
            sx={{
              my: 1,
              border: "1px solid",
              borderRadius: 2,
              borderColor: "divider",
            }}
          >
            <Layout variants={["column"]} sx={{ p: "16px 16px 8px 16px" }}>
              <Typography gutterBottom variant="h6">
                Web 的常规首选项
              </Typography>

              <Typography gutterBottom variant="body2" color={"text.secondary"}>
                管理 Web 上 AAK 服务的设置
              </Typography>
            </Layout>

            <ButtonGroup
              disableElevation
              orientation="vertical"
              variant="text"
              color="inherit"
            >
              <Button sx={{ p: 2 }} onClick={hanldeToggleTheme}>
                <Typography width={196} align={"left"} color={"text.secondary"}>
                  主题
                </Typography>

                <Typography flex={1} align={"left"} color={"text.primary"}>
                  {!accountDocument.theme ? "默认浅色" : null}
                  {accountDocument.theme === "light" ? "默认浅色" : null}
                  {accountDocument.theme === "dark" ? "默认深色" : null}
                </Typography>

                <Icon
                  icon={"mdi:exchange"}
                  width={24}
                  height={24}
                  color={theme.palette.text.primary}
                />
              </Button>
            </ButtonGroup>
          </Layout>

          <Layout
            variants={["column"]}
            sx={{
              my: 1,
              border: "1px solid",
              borderRadius: 2,
              borderColor: "divider",
            }}
          >
            <Layout variants={["column"]} sx={{ p: "16px 16px 8px 16px" }}>
              <Typography gutterBottom variant="h6">
                数据和隐私
              </Typography>

              <Typography gutterBottom variant="body2" color={"text.secondary"}>
                关键隐私选项可帮助您选择保存在您账号中的数据、您看到的广告、您与他人分享的信息等
              </Typography>
            </Layout>

            <ButtonGroup
              disableElevation
              orientation="vertical"
              variant="text"
              color="inherit"
            >
              <Button sx={{ p: 2 }} onClick={handleToPasswordTab}>
                <Typography width={196} align={"left"} color={"text.secondary"}>
                  密码
                </Typography>

                <Typography
                  flex={1}
                  letterSpacing={"1.25px"}
                  align={"left"}
                  color="text.primary"
                >
                  ••••••••
                </Typography>

                <Icon
                  icon={"material-symbols:chevron-right-rounded"}
                  width={24}
                  height={24}
                  color={theme.palette.text.primary}
                />
              </Button>

              <Button sx={{ p: 2 }} onClick={handleToLogoutTab}>
                <Typography width={196} align={"left"} color={"text.secondary"}>
                  注销
                </Typography>

                <Typography flex={1} color={"text.secondary"} align={"left"}>
                  删除您的整个账号和数据
                </Typography>

                <Icon
                  icon={"material-symbols:chevron-right-rounded"}
                  width={24}
                  height={24}
                  color={theme.palette.text.primary}
                />
              </Button>
            </ButtonGroup>
          </Layout>
        </Layout>
      </Layout>

      <PhotoDialog
        open={openPhotoDialog}
        handleClose={handleClosePhotoDialog}
      />
    </>
  );
}
