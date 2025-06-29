export type Transaction = {
    id: string;
    user_id: string;
    title: string;
    amount: string;
    category: "income" | "expense";
    createdAt: string;
}

export type Summary = {
    balance: number;
    income: number;
    expense: number;
}

export type CreateTransactionBody = Omit<Transaction, "id" | "createdAt">;
