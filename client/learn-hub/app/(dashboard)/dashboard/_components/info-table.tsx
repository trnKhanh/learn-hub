"use client";

export const InfoTable = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col">
      <div className="text-center text-xl">{label}</div>
      <table className="border border-collapse ">{children}</table>
    </div>
  );
};

export const InfoTableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr className="hover:bg-slate-100">{children}</tr>;
};

export const InfoTableKey = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="w-1/2 text-left border border-slate-700 p-1">{children}</th>
  );
};

export const InfoTableValue = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
      {children}
    </th>
  );
};
