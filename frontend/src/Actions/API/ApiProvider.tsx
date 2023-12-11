import React from "react";
interface PropsInfo {
  children: React.ReactNode;
}
export const ApiProvider = ({ children }: PropsInfo) => {
  const [jsonWebToken,] = React.useState<string | null>(null);

  const context = {
    jsonWebToken,
  };

  return <APIContext.Provider value={context}>{children}</APIContext.Provider>;
};

interface APIContextInterface {
  jsonWebToken: string | null;
}
export const APIContext = React.createContext<APIContextInterface>({
  jsonWebToken: "",
});
