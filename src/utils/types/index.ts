export type Category = 'compras' | 'gastosFijos' | 'gato' | 'permitidos'

export type Expense = { 
  id: number, 
  category: Category,
  type: string,
  price: number,
  date: string,
  user: User,
}

export type User = null | 'user-1' | 'user-2'