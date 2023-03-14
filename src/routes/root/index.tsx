import * as React from "react";
import { Navigate } from "react-router-dom";
import { useURLQuery, useURLWithQuery } from "../../hooks/reuse-hooks/useHook";
import { useAppSelector } from "../../redux/store";

export interface IRootProps {}

export default function Root(props: IRootProps) {
  const { from } = useURLQuery();

  const loginURL = useURLWithQuery("/login", { from });

  //

  const auth = useAppSelector((state) => state.auth);

  return !auth.bool ? (
    <Navigate to={loginURL} replace />
  ) : (
    <Navigate to={"/dashboard"} replace />
  );
}
