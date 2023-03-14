import { MongoIdType, ThemeType } from "./re-utils/type";

export interface IAuthPO {
  bool: boolean;
  email?: string;
}

export interface IAccountPO {
  id: string;
  email: string;
  password: string;
  documentIdsStr: string;
}

export interface IAccountDocumentPO {
  _id: MongoIdType;
  username: string;
  photo?: string;
  theme?: ThemeType;
}
