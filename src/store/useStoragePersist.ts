import { Dishe } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  // ingredients: Ingredient[];
  // setIngredients: (ingredients: Ingredient[]) => void;

  dish: Dishe[];
  addDish: (dish: Dishe) => void;

  name: string;
  setName: (name: string) => void;
};

export const useStoragePersist = create(
  persist<State>(
    (set) => ({
      // ingredients: [],
      // setIngredients: (ingredients) => set({ ingredients }),
      dish: [],
      addDish: (dish) => set((state) => ({ dish: [...state.dish, dish] })),
      name: '',
      setName: (name) => set({ name }),
    }),
    {
      name: 'persistent-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
