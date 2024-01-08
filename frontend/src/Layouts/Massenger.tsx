import React from "react";
import FloatingButton from "../Components/FloatingButton/FloatingButton";
import { useLanguage } from "../Config/Languages/useLanguage";
import { LanguageConfig } from "../Config/Languages/LanguageProvider";

const Massenger = ({ children }: { children: React.ReactNode }) => {
  const { language, FA, EN } = useLanguage();
  
  return (
    <div className="flex flex-row gap-1 w-[1200px] h-[680px] mt-20 mb-20 rounded-2xl border-blue-500 bg-white/70 backdrop-blur-sm">
      {language === "EN" && <FloatingButton/>}

      {children}

      {language === "FA" && <FloatingButton/>}

    </div>
  );
};

export default Massenger;
