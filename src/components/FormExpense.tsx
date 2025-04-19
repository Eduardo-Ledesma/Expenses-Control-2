import { useState, useEffect, FormEvent, useMemo } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { useExpensesStore } from '@/stores/useExpensesStore'
import { type Expense, type Category } from '@/utils/types'

const FormExpense: React.FC = () => {

    const user = useExpensesStore(state => state.user)
    const selectedExpense = useExpensesStore(state => state.selectedExpense)
    const setShowForm = useExpensesStore(state => state.setShowForm)
    const showForm = useExpensesStore(state => state.showForm)
    const handleAddExpense = useExpensesStore(state => state.handleAddExpense)
    const handleConfirmEditExpense = useExpensesStore(state => state.handleConfirmEditExpense)

    const [id, setId] = useState<number | null>(null)
    const [category, setCategory] = useState<Category | ''>('')
    const [type, setType] = useState<string>('')
    const [price, setPrice] = useState<number | null>(null)
    const [categoryAlert, setCategoryAlert] = useState<{ msg: string}>({ msg: '' })
    const [typeAlert, setTypeAlert] = useState<{ msg: string}>({ msg: '' })
    const [priceAlert, setPriceAlert] = useState<{ msg: string}>({ msg: '' })

    const isFormValid = useMemo(() => {
        return category !== '' && type.trim() !== '' && price !== null
    }, [category, type, price])
    

    useEffect(() => {
        if(showForm && selectedExpense?.id) {
            const { category, type, price, id } = selectedExpense
            setCategory(category)
            setType(type)
            setPrice(price)
            setId(id)
        }
    }, [showForm, selectedExpense])

    const resetStates = () => {
        setId(null)
        setCategory('')
        setType('')
        setPrice(null)
        setCategoryAlert({ msg: '' })
        setTypeAlert({ msg: '' })
        setPriceAlert({ msg: '' })
    }

    const createNewDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if(!category.length) setCategoryAlert({ msg: 'Elige una categoría'})
        if(!type.trim().length) setTypeAlert({ msg: 'Agrega un nombre'})
        if(price === null) setPriceAlert({ msg: 'Define un precio'})
        
        if(!isFormValid) return
        
        if(id) {
            const edittedExpense: Expense = {
                id,
                category: category as Category,
                type,
                price: price as number,
                date: createNewDate(),
                user: selectedExpense?.user || user
            }

            handleConfirmEditExpense(edittedExpense)
        } else {
            const newExpense: Expense = {
                id: Date.now(),
                category: category as Category,
                type,
                price: price as number,
                date: createNewDate(),
                user: user
            }

            handleAddExpense(newExpense)
        }
        resetStates()
    }

    const handleSetCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = e.target.value

        if(value !== '') {
            setCategoryAlert({ msg: '' })
        }
        setCategory(value as Category)
    }

    const handleSetType = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value.trimStart()

        if(value !== '') {
            setTypeAlert({ msg: '' })
        }
        setType(value)
    }

    const handleSetPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value.trim()
        const removedInvalidChars = value.replace(/[^0-9.]/g, '')

        if(removedInvalidChars === '') {
            setPrice(null)
            return
        }
        setPriceAlert({ msg: '' })
        setPrice(Number(removedInvalidChars))
    }

    const handleCloseForm = () => {
        setShowForm(false)
        resetStates()
    }
    
    return (
        <Dialog open={showForm} onOpenChange={handleCloseForm}>
            <DialogContent className="bg-gray-900 border border-green-700 rounded-lg shadow-xl text-white p-6 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-3xl leading-6 font-bold text-green-500 text-center">
                        { selectedExpense?.id ? 'Editar Gasto' : 'Agregar Gasto' }
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-400 text-center">
                        
                        { selectedExpense?.id ? 'Modifica los campos que desees.' : 'Completa los datos para registrar un nuevo gasto.' }
                    </DialogDescription>
                </DialogHeader>

                <form className='my-6' onSubmit={handleSubmit}>
                    <div className='mb-8 flex flex-col'>
                        <label htmlFor="category" className='tex-gray-700 uppercase text-xl font-bold text-left text-white'>
                            Tipo de Gasto
                        </label>
                        <select
                            id='category'
                            name='category'
                            className={`border-2 w-full text-[22px] pb-[10px] pt-[6px] px-3 mt-2 placeholder-gray-400 rounded-md bg-white text-black
                                focus:outline-none hover:cursor-pointer ${ categoryAlert.msg ? `border-4 border-red-600` : ''}`
                            }
                            value={category}
                            onChange={handleSetCategory}
                        >
                            <option value="">-- Categoria --</option>
                            <option value="gastosFijos">Gastos Fijos</option>
                            <option value="compras">Compras</option>
                            <option value="gato">Gato</option>
                            <option value="permitidos">Permitidos</option>                                               
                        </select>
                        { categoryAlert.msg && <p className='text-red-500 text-center mt-2 text-lg'>{categoryAlert.msg}</p>}

                        <input type="text" 
                            name='type'
                            placeholder='Nombre del gasto'
                            className={`bg-white text-black pb-[10px] pt-[6px] px-3 mt-4 text-[22px] rounded-md focus:outline-none ${typeAlert.msg ? `border-4 border-red-600` : ''}`}
                            value={type}
                            onChange={handleSetType}
                        />                                                
                        { typeAlert.msg && <p className='text-red-500 text-center mt-2 text-lg'>{typeAlert.msg}</p>}
                    </div>

                    <div className='mb-5 flex flex-col'>
                        <label htmlFor="number"
                            className='tex-gray-700 uppercase text-xl font-bold text-left text-white'
                        >
                            Precio
                        </label>
                        <input type="number"
                            name='price'
                            id='price' 
                            placeholder='Precio'
                            className={`bg-white text-black pb-[10px] pt-[6px] px-3 mt-2 rounded-md text-[22px] focus:outline-none ${priceAlert.msg ? `border-4 border-red-600` : ''}`}
                            value={price ?? ''}
                            onChange={handleSetPrice}
                        />
                        { priceAlert.msg && <p className='text-red-500 text-center mt-2 text-lg'>{priceAlert.msg}</p>}
                    </div>

                    <input type="submit"
                        value={ selectedExpense?.id ? 'Editar gasto' : 'Agregar gasto'}
                        className='bg-green-700 hover:bg-green-800 w-full p-3 mt-4 text-white uppercase 
                            font-bold hover:cursor-pointer transition-colors rounded text-lg'
                    />
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default FormExpense