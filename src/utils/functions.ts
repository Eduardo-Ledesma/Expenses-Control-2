import { toast } from "react-toastify"

export const showSuccessToast = (message: string) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
    });
}

export const maskNumber = (number: number) => {
    const formattedNumber = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
    }).format(number);

    return formattedNumber;
}

