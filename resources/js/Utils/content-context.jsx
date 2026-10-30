import { createContext, useContext } from "react";
import { DEFAULT_CONTENT } from "./wedding-content.js";

const ContentContext = createContext(DEFAULT_CONTENT);

export const ContentProvider = ContentContext.Provider;

export function useContent() {
  return useContext(ContentContext);
}
