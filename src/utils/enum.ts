import { IConstraintVO } from "../components/reuse-components";

export const CONSTRAINT: { [key: string]: IConstraintVO[] } = {
  username: [
    { type: "NotBlank", message: "用户名不能为空" },
    {
      type: "Length",
      message: "用户名长度为2-12位",
      min: 2,
      max: 12,
    },
  ],
  email: [
    {
      type: "NotBlank",
      message: "邮箱不能为空",
    },
    { type: "Email" },
  ],
  password: [
    {
      type: "NotBlank",
      message: "密码不能为空",
    },
    {
      type: "Length",
      message: "密码长度为为4-12位",
      min: 4,
      max: 12,
    },
  ],
  captcha: [
    { type: "NotBlank", message: "验证码不能为空" },
    {
      type: "Length",
      message: "验证码长度为6位",
      min: 6,
      max: 6,
    },
  ],
};
