import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Expense = { id: number, quantity: number }
type User = null | 'user-1' | 'user-2'

type ExpensesStoreState = { 
  expenses: Expense[];
  user: User;
  showForm: boolean;
}

type ExpensesStoreActions = {
  setExpense: (expense: Expense) => void;
  deleteExpense: (id: number) => void;
  setUser: (user: User) => void;
  setShowForm: (show: boolean) => void;
}

type ExpensesStore = ExpensesStoreState & ExpensesStoreActions

export const useExpensesStore = create<ExpensesStore>()(
    persist(
      (set) => ({
        expenses: [],
        user: null,
        showForm: false,
        setExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
        deleteExpense: (id) => set((state) => ({ expenses: state.expenses.filter((expense) => expense.id !== id)})),
        setUser: (user: User) => set(() => ({ user })),
        setShowForm: (show: boolean) => set(() => ({ showForm: show })),
      }),
      { 
        name: 'expenses-storage',
        partialize: (state) => ({
          expenses: state.expenses,
          user: state.user
        }),
      },
    ),
)