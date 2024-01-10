import React from "react";

export const ApiProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [jsonWebToken] = React.useState<string | null>(
    (localStorage.getItem("mytel-jwt") as string) !== ""
      ? (localStorage.getItem("mytel-jwt") as string)
      : "n"
  );

  React.useEffect(() => {
    jsonWebToken
      ? localStorage.setItem("mytel-jwt", jsonWebToken)
      : localStorage.setItem("mytel-jwt", "");
  }, [jsonWebToken]);

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
