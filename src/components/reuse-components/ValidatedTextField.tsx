// 2023-03-06 20:00:00

import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export interface IConstraintVO {
  type: Type;
  message?: string;
  min?: number;
  max?: number;
  valueId?: string;
}

export interface IValidatedRef {
  value: string;
  handleValid: (value?: string) => boolean;
}

export interface IValidatedTextFieldProps {
  placeholder?: string;
  textfieldProps?: TextFieldProps;
  constraints?: IConstraintVO[];
  validatedRef?: React.MutableRefObject<IValidatedRef>;
}

export function ValidatedTextField(props: IValidatedTextFieldProps) {
  const { textfieldProps, constraints, validatedRef } = props;

  const placeholder = React.useMemo(
    () => props.placeholder ?? "",
    [props.placeholder]
  );

  //

  const inputEl = React.useRef<HTMLInputElement>(null);

  const [value, setValue] = React.useState(placeholder);

  const [validated, setValidated] = React.useState<{
    bool: boolean;
    message: string;
  }>({
    bool: true,
    message: "",
  });

  const handleValid = React.useCallback(
    (value0: string) => {
      if (!constraints) return true;

      let value1 = value0 ?? value;
      let bool = true;

      for (let i = 0; i < constraints.length; i++) {
        let constraint = constraints[i];

        if (!CONSTRAINT[constraint.type].valid(value1, constraint)) {
          setValidated({
            bool: false,
            message: constraint.message ?? CONSTRAINT[constraint.type].message,
          });
          bool = false;
          if (inputEl.current) inputEl.current.focus();
          break;
        }
      }

      if (bool) setValidated({ bool: true, message: "" });
      return bool;
    },
    [value, constraints]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = event.target.value;
      setValue(value);
      if (!validated.bool) handleValid(value);
    },
    [validated, handleValid]
  );

  React.useEffect(() => {
    if (validatedRef) validatedRef.current = { value, handleValid };
  }, [validatedRef, value, validated, handleValid]);

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      size={"medium"}
      type={"text"}
      variant={"outlined"}
      {...textfieldProps}
      value={value}
      inputRef={inputEl}
      onChange={handleChange}
      error={!validated.bool}
      helperText={
        (!validated.bool && validated.message) || textfieldProps?.helperText
      }
    />
  );
}

type Type = "NotBlank" | "Email" | "Length" | "VerifyValue" | "URL";

const CONSTRAINT = {
  NotBlank: {
    message: "不能为空",
    valid: (value: string, constraint: IConstraintVO) =>
      value !== null && value !== "" && value.trim() !== "",
  },
  Email: {
    message: "不是一个合法的电子邮件地址",
    valid: (value: string, constraint: IConstraintVO) =>
      /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value),
  },
  Length: {
    message: "长度在0-n位",
    valid: (value: string, constraint: IConstraintVO) =>
      value.length >= constraint.min && value.length <= constraint.max,
  },
  VerifyValue: {
    message: "验证错误",
    valid: (value: string, constraint: IConstraintVO) =>
      value === document.getElementById(constraint.valueId)["value"],
  },
  URL: {
    message: "不是一个合法的URL",
    valid: (value: string, constraint: IConstraintVO) =>
      /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/.test(
        value
      ),
  },
};
