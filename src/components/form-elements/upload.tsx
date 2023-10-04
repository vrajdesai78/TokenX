import React from "react";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";

type UploadProps = {
  id: string;
  name: string;
  type: string;
  accept: string;
  onChange: any;
};

const Upload = ({ id, name, type, accept, onChange }: UploadProps) => {
  return (
    <div className="flex flex-col w-full">
      <Button
        startIcon={<FileUploadIcon />}
        className="max-w-full dark:text-[#9FF3FF] p-3 border-1 dark:border-[#9FF3FF] hover:border-[#9FF3FF] rounded-lg mb-5 md:mb-0"
        variant="outlined"
      >
        Upload
        <input
          id={id}
          name={name}
          type={type || "file"}
          className="opacity-0 absolute left-0 right-0 max-w-full"
          accept={accept || "image/*"}
          onChange={onChange}
          required
        />
      </Button>
    </div>
  );
};

Upload.defaultProps = {
  type: "file",
  accept: "image/*",
  onchange: () => {},
};

export default Upload;
