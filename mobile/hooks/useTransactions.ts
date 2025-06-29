import { getTransactions, createTransaction, deleteTransaction, getSummary } from "@/api/transactions";
import { CreateTransactionBody } from "@/types/transacation.type";
import { useMutation, useQueryClient, useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner-native";


export const useTransactions = (userId: string) => {
    const queryClient = useQueryClient();

    const [
        transactions,
        summary,
    ] = useQueries({
        queries: [
            { queryKey: ["transactions", userId], queryFn: () => getTransactions(userId) },
            { queryKey: ["summary", userId], queryFn: () => getSummary(userId) },
        ],
    });

    const createTransactionMutation = useMutation({
        mutationFn: (transaction: CreateTransactionBody) => createTransaction(transaction),
        onSuccess: () => {
            toast.success("Transaction created successfully");
            queryClient.invalidateQueries({ queryKey: ["transactions", userId] });
            queryClient.invalidateQueries({ queryKey: ["summary", userId] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const deleteTransactionMutation = useMutation({
        mutationFn: (transactionId: string) => deleteTransaction(transactionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] });
        },
    });

    const isHomeLoading = useMemo(() => {
        return transactions.isLoading || summary.isLoading;
    }, [transactions.isLoading, summary.isLoading]);

    return {
        transactions,
        summary,
        isHomeLoading,
        createTransactionMutation,
        deleteTransactionMutation,
    };
}

