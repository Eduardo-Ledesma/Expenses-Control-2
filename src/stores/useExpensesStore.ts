import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Expense, type User } from '@/utils/types'
import { showSuccessToast } from '@/utils/functions'

type ExpensesStoreState = {
  user: User;
  expenses: Expense[];
  selectedExpense: Expense | null;
  showForm: boolean;
}

type ExpensesStoreActions = {
  setExpense: (expense: Expense) => void;
  deleteExpense: (id: number) => void;
  setUser: (user: User) => void;
  setShowForm: (show: boolean) => void;
  handleAddExpense: (expense: Expense) => void;
  handleSetExpenseToEdit: (expense: Expense) => void;
  handleConfirmEditExpense: (expense: Expense) => void;
  handleDeleteExpense: (id: number) => void;
  handleResetExpenses: () => void;
}

type ExpensesStore = ExpensesStoreState & ExpensesStoreActions

export const useExpensesStore = create<ExpensesStore>()(
    persist(
      (set) => ({
        user: null,
        expenses: [],
        selectedExpense: null,
        showForm: false,
        setExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
        deleteExpense: (id) => set((state) => ({ expenses: state.expenses.filter((expense) => expense.id !== id)})),
        setUser: (user: User) => set(() => ({ user })),
        setShowForm: (show: boolean) => set(() => ({ showForm: show, selectedExpense: null })),
        handleAddExpense: (expense: Expense) => set((state) => {
          showSuccessToast('Gasto agregado exitosamente!')
          return {
            expenses: [...state.expenses, expense],
            showForm: false,
          };
        }),
        handleSetExpenseToEdit: (expense: Expense) => set(() => ({
          selectedExpense: expense || null,
          showForm: !!expense,
        })),
        handleConfirmEditExpense: (expense: Expense) => set((state) => {
          const updatedExpenses = state.expenses.map((exp) => (exp.id === expense.id ? expense : exp));
          showSuccessToast('Gasto editado exitosamente!')
          return {
            expenses: updatedExpenses,
            selectedExpense: null,
            showForm: false,
          };
        }),
        handleDeleteExpense: (id: number) => set((state) => {
          const updatedExpenses = state.expenses.filter((expense) => expense.id !== id);
          showSuccessToast('Gasto eliminado exitosamente!')
          return {
            expenses: updatedExpenses,
          };
        }),
        handleResetExpenses: () => set(() => ({
          expenses: [],
          selectedExpense: null,
          showForm: false,
        })),
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