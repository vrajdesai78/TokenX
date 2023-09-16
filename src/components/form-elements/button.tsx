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
      className={`w-[100px] mx-auto text-[#ffffff] items-center justify-center ${disabled ? "bg-violet-200" : "bg-violet-500"} hover:bg-violet-600 focus:ring-1 focus:outline-none focus:ring-[#cfcfcf] font-medium rounded-xl text-sm px-5 py-2.5 text-center shadow-none dark:bg-violet-500 dark:hover:bg-violet-600 dark:text-gray-100 hover:drop-shadow-xl`}
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