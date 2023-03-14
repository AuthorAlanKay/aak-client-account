import { Button } from "@mui/material";
import * as React from "react";
import { useURLQuery, useURLWithQuery } from "../../hooks/reuse-hooks/useHook";
import { setAuth } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAccount, initDocument } from "../../utils/api";
import { getDocument } from "../../utils/re-utils/api";
import { APPS } from "../../utils/reuse-utils/enum";
import { navigate } from "../../utils/reuse-utils/tool";
import { IResultVO } from "../../utils/reuse-utils/type";
import { IAccountDocumentPO, IAccountPO } from "../../utils/type";

export interface IApiProps {}

export function Api(props: IApiProps) {
  const { from } = useURLQuery();

  const loginURL = useURLWithQuery("/login", { from });

  //

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const email = useAppSelector((state) => state.account.email);

  const handleExit = React.useCallback(() => {
    dispatch(setAuth({ bool: false, email }));

    navigate(loginURL, { top: true });
  }, [dispatch, email, loginURL]);

  React.useEffect(() => {
    let init = async () => {
      if (!from) return;
      if (!auth.bool) {
        window.parent.postMessage(
          {
            code: 1002,
            message: "用户未登录",
            data: { isAuth: false },
          },
          "*"
        );
        return;
      }

      let accountResultVO: IResultVO<IAccountPO> = await getAccount(auth.email);
      let documentIds = JSON.parse(accountResultVO.data.documentIdsStr);

      for (let i = 0; i < APPS.length; i++) {
        let app = APPS[i];
        if (from.indexOf(app.url) !== -1) {
          if (!documentIds[app.key]) {
            accountResultVO = await initDocument({
              email: auth.email,
              collection: app.key,
            });
          }
          break;
        }
      }

      let documentResultVO: IResultVO<IAccountDocumentPO> = await getDocument(
        "account",
        documentIds["account"]
      );

      window.parent.postMessage(
        {
          code: 1000,
          message: "用户已登录",
          data: {
            isAuth: true,
            email: accountResultVO.data.email,
            username: documentResultVO.data.username,
            theme: documentResultVO.data.theme,
            photo: documentResultVO.data.photo,
            documentIdsStr: accountResultVO.data.documentIdsStr,
          },
        },
        "*"
      );
    };

    let id = setTimeout(init, 64);
    return () => clearTimeout(id);
  }, [auth, from, dispatch]);

  return <Button id="api-exit-button" hidden onClick={handleExit} />;
}
