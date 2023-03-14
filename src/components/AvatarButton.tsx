import { Icon } from "@iconify/react";
import { Avatar, BoxProps } from "@mui/material";
import * as React from "react";
import { Layout } from "./reuse-components";
import { useAppSelector } from "../redux/store";

export interface IAvatarButtonProps {
  size: number;
  isButton?: boolean;
  handleOpenPhotoDialog?: () => void;
}

export function AvatarButton(props: IAvatarButtonProps) {
  const { size, handleOpenPhotoDialog } = props;

  const isButton = React.useMemo(
    () => (props.isButton === undefined ? true : props.isButton),
    [props.isButton]
  );

  //

  const accountDocument = useAppSelector((state) => state.accountDocument);

  const overlayOpacity = React.useMemo(() => (isButton ? 0 : 1), [isButton]);

  const boxProps: BoxProps = React.useMemo(
    () =>
      isButton && {
        component: "button",
        onClick: handleOpenPhotoDialog,
      },
    [isButton, handleOpenPhotoDialog]
  );

  return (
    <Layout
      boxProps={boxProps}
      variants={["center"]}
      sx={{
        width: size,
        height: size,
        overflow: "hidden",
        borderRadius: "50%",
        bgcolor: "transparent",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Avatar
        variant="square"
        alt={accountDocument.username}
        src={accountDocument.photo}
        sx={{ width: size, height: size }}
      />

      <Layout
        variants={["full", "absolute", "top", "left"]}
        sx={{
          opacity: overlayOpacity,
          transition: "opacity 0.2s ease-in-out",
          "&:hover": { opacity: 1 },
        }}
      >
        <Layout
          variants={["center", "width", "absolute", "bottom", "left"]}
          sx={{
            height: "33%",
            backgroundColor: "rgba(32,33,36,.6)",
          }}
        >
          <Icon
            icon="material-symbols:photo-camera-outline"
            width={(size * 24) / 96}
            height={(size * 24) / 96}
            color={"rgba(255, 255, 255, .9)"}
          />
        </Layout>
      </Layout>
    </Layout>
  );
}
