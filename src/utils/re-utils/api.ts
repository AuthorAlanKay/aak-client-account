// 2023-03-06 20:00:00

import { ACCOUNT_SERVER } from "../reuse-utils/enum";
import { getFetch, postFetch } from "../reuse-utils/tool";

// document

export const getDocument = async (collection: string, documentId: string) =>
  await getFetch(
    ACCOUNT_SERVER + "/document/get-document/" + collection + "/" + documentId
  );

export interface ISetDocumentDTO {
  collection: string;
  documentId: string;
  key: string;
  value: Object;
}

export const setDocument = async (bodyObject: ISetDocumentDTO) =>
  await postFetch(ACCOUNT_SERVER + "/document/set-document", bodyObject);
