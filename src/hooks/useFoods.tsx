import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { Food } from "../types";

interface FoodsProviderProps {
  children: ReactNode;
}

type FoodInput = Omit<Food, "id" | "available">;

interface FoodsContextData {
  foods: Food[];
  addFood: (food: FoodInput) => void;
  editingFood: Food;
  setEditingFood: (food: Food) => void;
  editFood: (food: Food) => void;
  deleteFood: (id: number) => void;
}

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [editingFood, setEditingFood] = useState<Food>({} as Food);

  useEffect(() => {
    async function loadFoods() {
      const { data: foods } = await api.get('/foods');
      setFoods(foods);
    }
    loadFoods()
  }, []);

  async function addFood(food: FoodInput) {
    try {
      const { data: newFood } = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, newFood]);
    } catch (err) {
      console.log(err);
    }
  }

  async function editFood(food: Food) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered);
  }

  return (
    <FoodsContext.Provider value={{
      foods,
      addFood,
      editingFood,
      setEditingFood,
      editFood,
      deleteFood,
    }}>
      { children }
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);
  return context;
}