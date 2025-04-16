import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useExpensesStore } from '@/stores/useExpensesStore'

const FormExpense: React.FC = () => {

    const setShowForm = useExpensesStore(state => state.setShowForm)
    const showForm = useExpensesStore(state => state.showForm)
    
    return (
        <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default FormExpense