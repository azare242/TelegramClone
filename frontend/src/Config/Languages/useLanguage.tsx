import React from "react";
import { LanguageContext } from "./LanguageProvider";

export const useLanguage = () => React.useContext(LanguageContext);
