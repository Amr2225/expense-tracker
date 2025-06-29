export type Transaction = {
    id: string;
    user_id: string;
    title: string;
    amount: string;
    category: "Income" | string;
    createdAt: string;
}

export type Summary = {
    balance: string;
    income: string;
    expense: string;
}

export type CreateTransactionBody = Omit<Transaction, "id" | "createdAt">;
