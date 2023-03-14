import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import {
  ITabsRef,
  Layout,
  LoadingProgress,
  Logo,
  MotionTabs,
} from "./reuse-components";
import { setAccountDocument } from "../redux/features/accountDocumentSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setDocument } from "../utils/re-utils/api";
import { IAccountDocumentPO } from "../utils/type";
import { IResultVO } from "../utils/reuse-utils/type";
import { setGlobal } from "../redux/reuse-features/globalSlice";

export interface IPhotoDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function PhotoDialog(props: IPhotoDialogProps) {
  const { open, handleClose } = props;

  //

  const tabsRef = React.useRef<ITabsRef>(null);

  const [suspense, setSuspense] = React.useState(false);

  const tabs = React.useMemo(
    () => [
      {
        value: "photo-dialog",
        element: (
          <PhotoDialogMotionTab tabsRef={tabsRef} handleClose={handleClose} />
        ),
        from: {
          x: 0,
          width: UPLOAD_PHOTO_MOTION_TAB_WIDTH,
          height: UPLOAD_PHOTO_MOTION_TAB_HEIGHT,
        },
        to: {
          width: PHOTO_DIALOG_MOTION_TAB_WIDTH,
          height: PHOTO_DIALOG_MOTION_TAB_HEIGHT,
        },
      },
      {
        value: "upload-photo",
        element: (
          <UploadPhotoMotionTab tabsRef={tabsRef} setSuspense={setSuspense} />
        ),
        from: {
          x: 0,
          width: PHOTO_DIALOG_MOTION_TAB_WIDTH,
          height: PHOTO_DIALOG_MOTION_TAB_HEIGHT,
        },
        to: {
          width: UPLOAD_PHOTO_MOTION_TAB_WIDTH,
          height: UPLOAD_PHOTO_MOTION_TAB_HEIGHT,
        },
      },
      {
        value: "delete-photo",
        element: (
          <DeletePhotoMotionTab tabsRef={tabsRef} setSuspense={setSuspense} />
        ),
        from: {
          x: 0,
          width: PHOTO_DIALOG_MOTION_TAB_WIDTH,
          height: PHOTO_DIALOG_MOTION_TAB_HEIGHT,
        },
        to: {
          width: DELETE_PHOTO_MOTION_TAB_WIDTH,
          height: DELETE_PHOTO_MOTION_TAB_HEIGHT,
        },
      },
      {
        value: "got-it",
        element: <GotItMotionTab handleClose={handleClose} />,
        tabSx: {
          width: GOT_IT_MOTION_TAB_WIDTH,
          height: GOT_IT_MOTION_TAB_HEIGHT,
        },
      },
    ],
    [handleClose]
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      {suspense && <LoadingProgress variant="wait" />}

      <MotionTabs tabs={tabs} tabsRef={tabsRef} />
    </Dialog>
  );
}

const PHOTO_DIALOG_MOTION_TAB_WIDTH = 400;

const PHOTO_DIALOG_MOTION_TAB_HEIGHT = 560;

const UPLOAD_PHOTO_MOTION_TAB_WIDTH = 540;

const UPLOAD_PHOTO_MOTION_TAB_HEIGHT = 440;

const DELETE_PHOTO_MOTION_TAB_WIDTH = 540;

const DELETE_PHOTO_MOTION_TAB_HEIGHT = 440;

const GOT_IT_MOTION_TAB_WIDTH = 540;

const GOT_IT_MOTION_TAB_HEIGHT = 440;

interface IPhotoDialogMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  handleClose: () => void;
}

function PhotoDialogMotionTab(props: IPhotoDialogMotionTabProps) {
  const { tabsRef, handleClose } = props;

  //

  const accountDocument = useAppSelector((state) => state.accountDocument);

  const handleToUploadPhotoTab = React.useCallback(
    () => tabsRef.current.to("upload-photo"),
    [tabsRef]
  );

  const handleToDeletePhotoTab = React.useCallback(
    () => tabsRef.current.to("delete-photo"),
    [tabsRef]
  );

  return (
    <Layout variants={["width", "column", "align"]}>
      <Layout variants={["width", "align"]} sx={{ height: 56 }}>
        <IconButton size="large" onClick={handleClose}>
          <Icon icon="ic:round-close" width={24} height={24} />
        </IconButton>

        <Layout variants={["center"]} sx={{ width: 300 }}>
          <Logo variant="aak" sx={{ height: 24, width: (24 * 600) / 75 }} />

          <Typography sx={{ fontSize: "20px" }}>账号</Typography>
        </Layout>
      </Layout>

      <Layout
        variants={["width", "column", "align"]}
        sx={{ px: 3, py: 2, gap: 1 }}
      >
        <Typography width={"100%"} variant="h6">
          个人资料照片
        </Typography>

        <Typography width={"100%"} color={"text.secondary"}>
          照片可帮助他人认出您，还能让您知道目前登录的是否是自己的帐号。
        </Typography>

        <Divider flexItem sx={{ my: 2 }} />

        <Button fullWidth sx={{ p: 0 }} onClick={handleToUploadPhotoTab}>
          <Avatar
            variant="square"
            alt={accountDocument.username}
            src={accountDocument.photo}
            sx={{ width: 250, height: 250 }}
          />
        </Button>

        <Layout variants={["width", "align"]} sx={{ gap: 2, my: 2 }}>
          <Button fullWidth variant="outlined" onClick={handleToUploadPhotoTab}>
            更改
          </Button>

          <Button fullWidth variant="outlined" onClick={handleToDeletePhotoTab}>
            移除
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
}

const UPLOAD_PHOTO_BUTTON_ID = "upload-photo-button";

interface IUploadPhotoMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
}

function UploadPhotoMotionTab(props: IUploadPhotoMotionTabProps) {
  const { tabsRef, setSuspense } = props;

  //

  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.account);

  const accountDocument = useAppSelector((state) => state.accountDocument);

  const handleBack = React.useCallback(
    () => tabsRef.current.to("photo-dialog"),
    [tabsRef]
  );

  const handleClickUploadButton = React.useCallback(
    () => document.getElementById(UPLOAD_PHOTO_BUTTON_ID).click(),
    []
  );

  const handleUploadPhoto = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let imgfile = event.currentTarget.files[0]; ///获得input的第一个图片

      //使用readAsDataURL来进行回显图片
      let reader = new FileReader(); //filereader.readasdataurl读取图像文件转换为流
      reader.readAsDataURL(imgfile);

      reader.onload = async function (event) {
        //读取数据时会触发一个load事件
        let imgs = this.result as string;

        setSuspense(true);

        let resultVO: IResultVO<IAccountDocumentPO> = await setDocument({
          collection: "account",
          documentId: JSON.parse(account.documentIdsStr)["account"],
          key: "photo",
          value: imgs,
        });

        if (resultVO.code === 1000) {
          dispatch(setGlobal({ theme: imgs }));
          dispatch(setAccountDocument(resultVO.data));
          tabsRef.current.to("got-it");
        }

        setSuspense(false);
      };
    },
    [setSuspense, account, dispatch, tabsRef]
  );

  return (
    <Layout variants={["width", "column", "align"]}>
      <Layout variants={["width", "align"]} sx={{ height: 56 }}>
        <IconButton size="large" onClick={handleBack}>
          <Icon icon="material-symbols:chevron-left" width={24} height={24} />
        </IconButton>
      </Layout>

      <Layout variants={["width", "column", "align"]} sx={{ px: 3 }}>
        <input
          hidden
          accept="image/*"
          type="file"
          id={UPLOAD_PHOTO_BUTTON_ID}
          onChange={handleUploadPhoto}
        />

        <Button fullWidth sx={{ p: 0 }} onClick={handleClickUploadButton}>
          <Avatar
            alt={"upload-photo"}
            src={accountDocument.photo}
            sx={{ width: 196, height: 196 }}
          />
        </Button>

        <Layout variants={["width", "column", "align"]} sx={{ my: 2 }}>
          <Typography variant="h6" gutterBottom>
            更改个人资料图片
          </Typography>

          <Typography color={"text.secondary"}>从电脑上传</Typography>
        </Layout>

        <Layout variants={["width", "align"]} sx={{ gap: 2, my: 2 }}>
          <Button fullWidth variant="outlined" onClick={handleBack}>
            取消
          </Button>

          <Button
            fullWidth
            disableElevation
            variant="contained"
            onClick={handleClickUploadButton}
          >
            上传
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
}

interface IDeletePhotoMotionTabProps {
  tabsRef: React.MutableRefObject<ITabsRef>;
  setSuspense: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeletePhotoMotionTab(props: IDeletePhotoMotionTabProps) {
  const { tabsRef, setSuspense } = props;

  //

  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.account);

  const handleBack = React.useCallback(
    () => tabsRef.current.to("photo-dialog"),
    [tabsRef]
  );

  const handleDeletePhoto = React.useCallback(async () => {
    setSuspense(true);

    let resultVO: IResultVO<IAccountDocumentPO> = await setDocument({
      collection: "account",
      documentId: JSON.parse(account.documentIdsStr)["account"],
      key: "photo",
      value: "",
    });

    if (resultVO.code === 1000) {
      dispatch(setAccountDocument(resultVO.data));
      tabsRef.current.to("got-it");
    }

    setSuspense(false);
  }, [tabsRef, setSuspense, account, dispatch]);

  return (
    <Layout variants={["width", "column", "align"]}>
      <Layout variants={["width", "align"]} sx={{ height: 56 }}>
        <IconButton size="large" onClick={handleBack}>
          <Icon icon="material-symbols:chevron-left" width={24} height={24} />
        </IconButton>
      </Layout>

      <Layout variants={["width", "column", "align"]} sx={{ px: 3 }}>
        <Avatar
          alt={"delete-photo"}
          src={""}
          sx={{ width: 196, height: 196 }}
        />

        <Layout variants={["width", "column", "align"]} sx={{ my: 2 }}>
          <Typography variant="h6" gutterBottom>
            要移除个人资料照片吗？
          </Typography>

          <Typography color={"text.secondary"}>
            移除个人资料照片后，此图片将用作您的个人资料照片。
          </Typography>
        </Layout>

        <Layout variants={["width", "align"]} sx={{ gap: 2, my: 2 }}>
          <Button fullWidth variant="outlined" onClick={handleBack}>
            取消
          </Button>

          <Button
            fullWidth
            disableElevation
            variant="contained"
            onClick={handleDeletePhoto}
          >
            移除
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
}

interface IGotItMotionTabProps {
  handleClose: () => void;
}

function GotItMotionTab(props: IGotItMotionTabProps) {
  const { handleClose } = props;

  //

  const accountDocument = useAppSelector((state) => state.accountDocument);

  return (
    <Layout variants={["width", "column", "align"]}>
      <Layout variants={["width", "align"]} sx={{ height: 56 }}>
        <IconButton size="large" onClick={handleClose}>
          <Icon icon="ic:round-close" width={24} height={24} />
        </IconButton>
      </Layout>

      <Layout variants={["width", "column", "align"]} sx={{ px: 3 }}>
        <Avatar
          alt={accountDocument.username}
          src={accountDocument.photo}
          sx={{ width: 196, height: 196 }}
        />

        <Layout variants={["width", "column", "align"]} sx={{ my: 2 }}>
          <Typography variant="h6" gutterBottom>
            更改图片成功
          </Typography>

          <Typography color={"text.secondary"}>
            照片可帮助他人认出您，还能让您知道目前登录的是否是自己的帐号
          </Typography>
        </Layout>

        <Layout variants={["width", "align"]} sx={{ gap: 2, my: 2 }}>
          <Button
            fullWidth
            disableElevation
            variant="contained"
            onClick={handleClose}
          >
            知道了
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
}
