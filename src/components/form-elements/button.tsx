import React from "react";
// @ts-ignore 
import PropTypes from "prop-types";

interface IButton {
  label?: string;
  onClick: (e: any) => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled }: IButton) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-[100px] mx-auto text-[#9FF3FF] dark:text-[#131619] hover:bg-black items-center justify-center ${disabled ? "dark:bg-[#abf3fe]" : "dark:bg-[#9FF3FF]"} ${disabled ? "bg-[#333334]" : "bg-[#131619]"} dark:hover:bg-[#95e5f2] focus:ring-1 focus:outline-none focus:ring-[#cfcfcf] font-medium rounded-xl text-sm px-5 py-2.5 text-center shadow-none drop-shadow-xl`}
    >
      {label}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  label: "",
  disabled: false,
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};