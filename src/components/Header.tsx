import { useState, useEffect } from 'react';
import { useExpensesStore } from '@/stores/useExpensesStore'
import Swal from 'sweetalert2';
import '../index.css'

const Header: React.FC = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [size, setSize] = useState(false)
    const setShowForm = useExpensesStore(state => state.setShowForm)
    const handleResetExpenses = useExpensesStore(state => state.handleResetExpenses)

    useEffect(() => {
        const textEl = document.getElementById('texto');
        if (!textEl) {
            setSize(false);
            return;
        }
    
        if (windowWidth < 1194) {
            setSize(false);
            return;
        }
        if (size) return;
    
        const words = ['pollo', 'carne', 'verduras', 'fideos', 'de todo!!!'];
        const timeouts: ReturnType<typeof setTimeout>[] = [];
    
        const textLoad = () => {
            words.forEach((word, index) => {
                const timeout = setTimeout(() => {
                    if (textEl) textEl.textContent = word;
                }, index * 3000);
                timeouts.push(timeout);
            });
        };
    
        textLoad();
        setSize(true);
        const interval = setInterval(textLoad, 15000);
    
        return () => {
            timeouts.forEach(clearTimeout);
            clearInterval(interval);
        };
    }, [windowWidth]);
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleReset = () => {
        Swal.fire({
            title: 'Borrar todos los gastos?',
            icon: 'warning',
            iconColor: '#c54444',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Borrar',
            customClass: {
                popup: 'swal-popup',
                title: 'swal-title',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleResetExpenses()
            }
        })
    }

    return (
        <header>
            {windowWidth > 1194 ? (
                <div className='p-10 flex flex-col gap-10 lg:flex-row items-center justify-between'>
                    <div className='font-bold text-4xl overflow-hidden'>
                        <span className="text-white relative">Hay que comprar: </span>
                        <span className="relative second-text text-green-600" id='texto'></span>
                    </div>

                    <h1 className="text-gray-200 font-bold text-6xl">Control de gastos</h1>
                </div>
            ) : (
                <div className='p-10 flex flex-col gap-10 lg:flex-row items-center justify-between'>
                    <h1 className="text-gray-200 font-bold text-6xl">Control de gastos</h1>
                    <div className='font-bold text-4xl'>
                        <p className='text-gray-200'>¿Qué hay que <span className='text-green-600'>comprar?</span> </p>
                    </div>
                </div>
            )}
            
            <nav className='bg-green-900 py-6 px-2 sm:p-6 flex justify-center gap-4 sm:gap-12 overflow-hidden border-y border-green-500'>
                <button type='button' 
                    className="animate__animated animate__fadeInLeftBig hover:cursor-pointer
                text-gray-200 hover:text-green-500 font-bold text-md sm:text-xl bg-gray-900 border-2 border-gray-400 p-3 rounded-md transition-colors hover:border-green-500"
                    onClick={() => setShowForm(true)}
                >
                    Agregar Gasto
                </button>

                <button type='button' 
                    className="animate__animated animate__fadeInRightBig hover:cursor-pointer
                text-gray-200 hover:text-green-500 font-bold text-md sm:text-xl bg-gray-900 border-2 border-gray-400 p-3 rounded-md transition-colors hover:border-green-500"
                    onClick={handleReset}
                >
                    Reiniciar Gastos
                </button>
            </nav>
        </header>
    )
}

export default Header