import React from "react";
// @ts-ignore
import PropTypes from "prop-types";

interface ISelect {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  options: {
    name: string;
    value: string;
  }[];
  onChange: (e: any) => void;
}

const Select = ({
  id,
  name,
  label,
  placeholder,
  options,
  onChange,
}: ISelect) => {
  return (
    <div className="w-[100%]">
      <select
        id={id}
        name={name}
        onChange={onChange}
        className="mt-0 border border-[#4f4f4f] bg-transparent text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
        style={{ borderWidth: "1px", borderColor: "#828282" }}
      >
        <option selected hidden disabled value="">
          {placeholder}
        </option>
        {options?.map(({ name, value }) => (
          <option key={value} className="text-gray-500" value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

Select.defaultProps = {
  label: "",
  placeholder: "",
  options: [],
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(Object),
  onchange: PropTypes.func,
  value: PropTypes.string,
};
