import React from "react";

type Props = {
  title: String;
  label: String;
  icon: JSX.Element;
};

const Card = ({ title, label, icon }: Props) => {
  return (
    <div className="min-w-[248px] max-w-md flex gap-4 flex-col p-6 bg-white border border-gray-200 rounded-lg shadow">
      {icon}
      <div className="flex gap-3 justify-between">
        <p className="text-base">{title}</p>
        <p className="text-lg font-semibold">{label}</p>
      </div>
    </div>
  );
};

export default Card;
