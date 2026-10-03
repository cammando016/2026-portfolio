import { createContext, useContext } from "react";
import { SearchableFile } from "../types/Files";

export const SearchIndexContext = createContext<SearchableFile[]>([]);
export const useSearchIndex = () => useContext(SearchIndexContext);