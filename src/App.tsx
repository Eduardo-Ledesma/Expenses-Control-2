import Header from '@/components/Header';
import ChooseUser from '@/components/ChooseUser';
import FormExpense from '@/components/FormExpense';
import Expense from '@/components/Expense';
import ShowTotal from '@/components/ShowTotal';
import { useExpensesStore } from '@/stores/useExpensesStore'
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'animate.css';
import './index.css'

function App() {

  const user = useExpensesStore(state => state.user)
  const setUser = useExpensesStore(state => state.setUser)
  const expenses = useExpensesStore(state => state.expenses)

  const handleClick = () => {
    Swal.fire({
      title: 'Cambiar de usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      customClass: {
        popup: 'swal-popup',
        title: 'swal-title',
      }
  }).then((result) => {
      if (result.isConfirmed) {
        setUser(null)
      }
  })
  }

  return (
    !user ? (
      <ChooseUser />
    ) : (
      <>
        <Header />
        <main>
            <div className='p-4 xl:pl-10'>
              <p className='text-white font-bold text-xl animate__animated animate__backInDown'>Usuario activo: <span className='text-green-500'>{user}</span></p>
              <button type='button'
                className='mt-2 hover:scale-110 transition-transform hover:cursor-pointer'
                onClick={handleClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout-2" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#c43131" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                  <path d="M15 12h-12l3 -3" />
                  <path d="M6 15l-3 -3" />
                </svg>
              </button>
            </div>

            { expenses.length ? (
              <article className='mt-6 md:mt-0 px-4'>
                  <h2 className='text-center text-4xl text-green-400 mb-14 font-bold'>Gastos Registrados:</h2>
                  <section className='flex flex-col gap-y-10 xl:flex-row lg:gap-x-4 xl:px-10 justify-around'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 h-fit'>
                    { 
                      expenses.map(expense => (
                        <Expense 
                          key={expense.id}
                          expense={expense}
                        />
                      ))
                    }
                    </div>
                    <div className='text-white text-center border-2 border-green-500 rounded-xl py-12 lg:px-4 2xl:px-6 mb-8 h-fit'>
                      <ShowTotal />
                    </div>
                  </section>
              </article>
            ) : (
              <div className='flex flex-col items-center gap-10 mt-10 text-3xl text-gray-200 p-6'>
                <p className='text-4xl'>No hay gastos registrados.</p>
                <img src="/img/rat-GIF.gif" alt="rata peinandose" width={498} height={280} />
              </div>
            )}

            <FormExpense />
            <ToastContainer />
        </main>
      </>
    )
  )
}

export default App
