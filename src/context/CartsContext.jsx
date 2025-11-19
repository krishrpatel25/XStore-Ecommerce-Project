import { useContext } from "react";
import { createContext } from "react";

export const CartsContext = createContext({});

export const CartsProvider = ({ children }) => {

  return <CartsProvider.Provider>{children}</CartsProvider.Provider>;
};


export const useCart = ()=> useContext(CartsContext)