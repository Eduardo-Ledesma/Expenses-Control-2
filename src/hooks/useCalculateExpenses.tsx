import { useState, useEffect, useCallback } from "react";
import { useExpensesStore } from "@/stores/useExpensesStore";
import { type Category } from "@/utils/types";

export const CalculateExpenses = () => {
    const [expensesUser1, setExpensesUser1] = useState(0)
    const [expensesUser2, setExpensesUser2] = useState(0)
    const [categories, setCategories] = useState({
        fixed: 0,
        buys: 0,
        cat: 0,
        allowed: 0
    })
    const [division, setDivision] = useState(0)
    const [debt, setDebt] = useState('')
    const [favor, setFavor] = useState('')
    const [total, setTotal] = useState(0)

    const expenses = useExpensesStore(state => state.expenses)

    const divideExpenses = useCallback(() => {
        setExpensesUser1(expenses.filter(exp => exp.user === 'user-1').reduce((acc, exp) => exp.price + acc, 0))
        setExpensesUser2(expenses.filter(exp => exp.user === 'user-2').reduce((acc, exp) => exp.price + acc, 0))
    }, [expenses])

    const calcTotal = useCallback(() => {
        const totalExpenses = expenses.reduce((acc, exp) => exp.price + acc, 0)
        setTotal(totalExpenses);
    }, [expenses])

    const getTotalByCategory = useCallback((category: Category) => {
        return expenses.filter(exp => exp.category === category).reduce((acc, exp) => exp.price + acc, 0)
    }, [expenses])

    const calculateCategory = useCallback(() => {
        const fixed = getTotalByCategory('gastosFijos')
        const buys = getTotalByCategory('compras')
        const cat = getTotalByCategory('gato')
        const allowed = getTotalByCategory('permitidos')

        setCategories({ fixed, buys, cat, allowed })
    }, [getTotalByCategory])

    const calculateDivision = useCallback(() => {
        if(expensesUser1 > expensesUser2) {
            setDivision(Math.ceil((expensesUser1 - expensesUser2) / 2))
            setDebt('user-2')
            setFavor('user-1')
        } else {
            setDivision(Math.ceil((expensesUser2 - expensesUser1) / 2))
            setDebt('user-1')
            setFavor('user-2')
        }
    }, [expensesUser1, expensesUser2])

    useEffect(() => {
        divideExpenses()
        calcTotal()
    }, [divideExpenses, calcTotal])

    useEffect(() => {
        calculateDivision()
    }, [calculateDivision])

    useEffect(() => {
        calculateCategory()
    }, [calculateCategory])

    return {
        expensesUser1,
        expensesUser2,
        categories,
        division,
        debt,
        favor,
        total
    };
}