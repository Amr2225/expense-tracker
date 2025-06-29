import { CreateTransactionBody, Summary, Transaction } from "@/types/transacation.type";

const API_URL = "http://192.168.1.2:3000/api";

export const getTransactions = async (userId: string): Promise<Transaction[]> => {
    const response = await fetch(`${API_URL}/transactions/${userId}`);
    return response.json();
}

export const getSummary = async (userId: string): Promise<Summary> => {
    const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
    return response.json();
}

export const deleteTransaction = async (transactionId: string): Promise<Transaction> => {
    const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "DELETE",
    });
    return response.json();
}

export const createTransaction = async (transaction: CreateTransactionBody): Promise<Transaction[]> => {
    const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        body: JSON.stringify(transaction),
    });
    return response.json();
}





