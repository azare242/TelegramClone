import React from "react";

const Massenger = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row gap-1 w-[1200px] h-[580px] mt-28 mb-28 rounded-2xl border-blue-500 bg-white/70 backdrop-blur-sm">
      {children}
    </div>
  );
};

export default Massenger;
