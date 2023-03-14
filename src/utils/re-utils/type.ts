// 2023-03-06 20:00:00

export type ThemeType = "light" | "dark";

export type MongoIdType = { timestamp: number; date: string };

export interface IGlobalPO {
  isAuth?: boolean;
  email?: string;
  photo?: string;
  username?: string;
  theme?: ThemeType;
  documentIdsStr?: string;
}
