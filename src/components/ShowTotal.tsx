import { CalculateExpenses } from "@/hooks/useCalculateExpenses"
import { maskNumber } from "@/utils/functions"

const ShowTotal = () => {
    
    const { 
        expensesUser1, 
        expensesUser2,
        categories,
        division,
        debt,
        favor,
        total
    } = CalculateExpenses()

    const { fixed, buys, cat, allowed } = categories

    return (
        <>
            <div className="flex gap-3 justify-center items-center mb-10">
                <h3 className='font-bold text-3xl sm:text-5xl'>Total:</h3>
                <p className='text-amber-500 font-bold text-3xl sm:text-5xl animate__animated animate__heartBeat'>{maskNumber(total)}</p>
            </div>

            <div>
                <h4 className="text-2xl font-bold mb-2">Resumen:</h4>
                { fixed > 0 && <p className="mb-1 text-lg">Gastos Fijos: <span className="text-amber-500 font-bold">{maskNumber(fixed)}</span></p> }
                { buys > 0 && <p className="mb-1 text-lg">Compras: <span className="text-amber-500 font-bold">{maskNumber(buys)}</span></p> }
                { cat > 0 && <p className="mb-1 text-lg">Gato: <span className="text-amber-500 font-bold">{maskNumber(cat)}</span></p> }
                { allowed > 0 && <p className="text-lg">Permitidos: <span className="text-amber-500 font-bold">{maskNumber(allowed)}</span></p> }
                <p className="mb-1 mt-4 text-lg">user-1 gastó: <span className="text-amber-500 font-bold">{maskNumber(expensesUser1)}</span></p>
                <p className="text-lg">user-2 gastó: <span className="text-amber-500 font-bold">{maskNumber(expensesUser2)}</span></p>
                { division > 0 ? 
                    <p className="text-2xl mt-4 text-green-500">{debt} debe: <span className="text-amber-500 font-bold">
                        {maskNumber(division)}</span> a {favor}.
                    </p> :
                    <p className="text-2xl mt-4 text-green-500">Ambos gastaron lo mismo.</p>} 
            </div>

        </>
    )
}

export default ShowTotal