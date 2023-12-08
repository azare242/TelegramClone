import React from "react";
import { APIContext } from "./ApiProvider";

export const useAPI = () => React.useContext(APIContext);
