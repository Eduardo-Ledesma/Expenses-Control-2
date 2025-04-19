import { useExpensesStore } from '@/stores/useExpensesStore'
import Swal from "sweetalert2"
import { type Expense } from '@/utils/types'
import { maskNumber } from "@/utils/functions"

const Expense = ({expense}: {expense: Expense}) => {

    const { category, type, price, date, user } = expense

    const handleSetExpenseToEdit = useExpensesStore(state => state.handleSetExpenseToEdit)
    const handleDeleteExpense = useExpensesStore(state => state.handleDeleteExpense)

    let showCategory
    switch (category) {
        case 'gastosFijos':
            showCategory = 'Gastos Fijos'
            break;
        case 'compras':
            showCategory = 'Compras'
            break;
        case 'gato':
            showCategory = 'Gato'
            break;
        case 'permitidos':
            showCategory = 'Permitidos'
            break;
        default:
            break;
    }

    const handleClick = (expense: Expense) => {
        Swal.fire({
            title: 'Que deseas hacer con el gasto?',
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Editar',
            denyButtonText: `Eliminar`,
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'swal-popup',
                title: 'swal-title',
              }
        }).then((result) => {
            if (result.isConfirmed) {
                handleSetExpenseToEdit(expense)
            } else if (result.isDenied) {
                handleDeleteExpense(expense.id)
            }
        })
        
    }

    return (
        <div className="flex relative justify-center min-w-fit border-2 border-white rounded-xl hover:border-green-500 
            hover:scale-105 sm:hover:scale-110 hover:cursor-pointer transition-all py-4 px-4"
            onClick={() => handleClick(expense)}
        >
            
            <p className="text-lg text-green-500 absolute left-3 top-2">{user}</p>
            <p className="text-base text-green-500 absolute right-3 top-2">{date}</p>
            <div className="flex flex-col self-end">
                <h3 className="text-white text-center font-bold text-3xl pt-6 mb-4">{type}</h3>
                <div className="flex gap-6 items-center">        
                    <p className="text-2xl text-amber-500 font-bold">{maskNumber(price)}</p>
                    <p className="text-white bg-green-700 py-1 px-3 mx-auto text-center rounded-full text-md">
                        {showCategory}
                    </p>
                </div>     
            </div>    
        </div>
    )
}

export default Expense