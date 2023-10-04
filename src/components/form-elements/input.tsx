import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useTheme } from "next-themes";

type InputProps = {
  id: string;
  name: string;
  label: string;
  type: string;
  onChange: any;
  helper: string;
  value?: string;
};

type CssTextFieldProps = {
  theme: string;
};

const CssTextField = styled(TextField)<CssTextFieldProps>(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme === "light" ? "#4f4f4f" : "#dedede",
    borderColor: theme === "light" ? "#4f4f4f" : "white",
  },
  "& label": {
    color: theme === "light" ? "#4f4f4f" : "#dedede",
  },
  "& .MuiOutlinedInput-root": {
    color: theme === "light" ? "#4f4f4f" : "#dedede",
    "& fieldset": {
      borderColor: theme === "light" ? "#4f4f4f" : "#dedede",
    },
    "&:hover fieldset": {
      borderColor: "#9FF3FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9FF3FF",
    },
  },
}));

const Input = ({
  id,
  name,
  label,
  type,
  onChange,
  value,
  helper,
}: InputProps) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-[100%]">
      <CssTextField
        theme={theme as any}
        id={id}
        name={name}
        label={label}
        variant="outlined"
        onChange={onChange}
        value={value}
        className="w-[100%] mt-1 text-gray-700"
        type={type}
        required
      />
      <div className="text-sm text-[#858585] mt-[4px]">{helper}</div>
    </div>
  );
};

export default Input;

Input.defaultProps = {
  label: "",
  type: "text",
  onchange: () => {},
  helper: "",
};
