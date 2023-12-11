import { Link } from "react-router-dom";
import "./NotFound.css";
import React from "react";
import { LanguageConfig } from "../../Config/Languages/LanguageProvider";
import { useLanguage } from "../../Config/Languages/useLanguage";

const NotFound = () => {
  const { language, FA, EN } = useLanguage();
  const languageConfig = React.useMemo<LanguageConfig>((): LanguageConfig => {
    if (language === "FA") return FA as LanguageConfig;
    else return EN as LanguageConfig;
  }, [EN, FA, language]);
  return (
    <div className="mt-32">
      <Link to="">
        <div className="card">
          <div className="first-content">
            <span>{languageConfig.fourOFour}</span>
          </div>
          <div className="second-content">
            <span>{languageConfig.notFound}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
