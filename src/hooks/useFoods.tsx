import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import api from "../services/api";

interface FoodsProviderProps {
  children: ReactNode;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface FoodsContextData {
  foods: Food[];
}

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    async function loadFoods() {
      const { data: foods } = await api.get('/foods');
      setFoods(foods);
    }
    loadFoods()
  }, []);

  return (
    <FoodsContext.Provider value={{
      foods,
    }}>
      { children }
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);
  return context;
}