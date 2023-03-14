// 2023-03-09 12:00:00

import * as React from "react";
import { navigate } from "../../utils/reuse-utils/tool";

export function useHandleOC(
  set: React.Dispatch<React.SetStateAction<boolean>>
) {
  const handleOpen = React.useCallback(() => set(true), [set]);

  const handleClose = React.useCallback(() => set(false), [set]);

  return [handleOpen, handleClose];
}

export function useHandleShow(
  bool: boolean,
  set: React.Dispatch<React.SetStateAction<boolean>>
) {
  const handleShow = React.useCallback(() => set(!bool), [bool, set]);

  return handleShow;
}

export function useHandleNavigate(
  to: string | 0,
  options?: { replace?: boolean; top?: boolean }
) {
  const handleNavigate = React.useCallback(
    () => navigate(to, options),
    [to, options]
  );

  return handleNavigate;
}

export function useURLQuery(url: string = window.location.href): {
  [key: string]: string;
} {
  // let searchParams = new URL(window.location.href).searchParams;

  // searchParams.forEach((i,y)=>console.log(i,y))

  let querys = {};

  let searchParams = new URL(url).searchParams;

  searchParams.forEach((value, key) => Object.assign(querys, { [key]: value }));

  return querys;
}

export function useURLWithQuery(oldURL: string, querys: {}) {
  let url = oldURL;

  let searchParams = new URLSearchParams();

  let keys = Object.keys(querys);
  for (let i = 0; i < keys.length; i++)
    if (querys[keys[i]]) searchParams.set(keys[i], querys[keys[i]]);

  let connector = url.indexOf("?") === -1 ? "?" : "&";
  url += connector + searchParams.toString();

  return url;
}
