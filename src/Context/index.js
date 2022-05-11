import { createContext, useContext } from "react";

export const MyTotalFavorite = createContext(null);

export const useMyFavorite = () => {
  return useContext(MyTotalFavorite);
};
