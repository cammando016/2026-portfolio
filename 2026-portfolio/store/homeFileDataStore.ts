import { homeFileData } from "../data/homeFileData";
import { createFileDataStore } from "./createFileDataStore";

export const useHomeFileDataStore = createFileDataStore(homeFileData);