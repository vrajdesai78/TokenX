import React from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { useTheme } from 'next-themes';

type CheckboxProps = {
    name: string;
    label: string;
    onChange: any;
    helper: string;
    checked: boolean;
}

type ThemeProps = {
    theme: string;
}

const CheckIcon = styled(Checkbox)<ThemeProps>(({ theme }) => ({
    color: theme === 'light' ? "#4f4f4f" : "#9FF3FF",
    '& .MuiSvgIcon-root': {
        color: theme === 'light' ? "#4f4f4f" : "#9FF3FF"
    },
  }));

const MCheckbox = ({ name, label, onChange, checked }: CheckboxProps) => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <FormControlLabel control={<CheckIcon checked={checked} theme={theme as any}/>} label={label} name={name} onClick={onChange} className="text-gray-600 dark:text-white/80" />
    </div>
  );
};

export default MCheckbox;

MCheckbox.defaultProps = {
  label: "",
  onchange: () => {},
  helper: "",
};