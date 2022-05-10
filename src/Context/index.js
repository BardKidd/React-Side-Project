import { createContext } from "react";

export const MyTotalFavorite = createContext(
  JSON.parse(localStorage.getItem("meals"))
);
