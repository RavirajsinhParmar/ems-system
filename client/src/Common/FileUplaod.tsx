import React from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  children: JSX.Element;
  onDrop: any;
};

const UploadFile = ({ children, onDrop }: Props) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default UploadFile;
