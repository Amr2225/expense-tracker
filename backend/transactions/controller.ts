import { Request, Response } from "express";
import { sql } from "../utils/db";
import { CreateTransactionBody, TypedRequest } from "./validators";


export const makeTransaction = async (req: TypedRequest<CreateTransactionBody>, res: Response) => {
    const { user_id, title, amount, category } = req.body;

    try {
        const transaction = await sql`INSERT INTO transactions (user_id, title, amount, category) VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *`;

        res.status(201).json({ message: "Transaction created successfully", data: transaction[0] });
    } catch (error) {
        console.log("Error creating transaction", error);
        res.status(500).json({ message: "Failed to create transaction" });
    }
}

export const getTransactions = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
        return res.status(200).json(transactions);

    } catch (error) {
        console.log("Error fetching transactions", error);
        return res.status(500).json({ message: "Failed to fetch transactions" });
    }

}

export const deleteTransaction = async (req: TypedRequest<CreateTransactionBody>, res: Response) => {
    const { transactionId } = req.params;

    try {
        const result = await sql`DELETE FROM transactions WHERE id = ${+transactionId} RETURNING *`;
        if (result.length === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.status(200).json({ message: "Transaction deleted successfully", data: result[0] });
    } catch (error) {
        console.log("Error deleting transaction", error);
        return res.status(500).json({ message: "Failed to delete transaction" });
    }
}


// ===== Summary =====
export const getSummary = async (req: TypedRequest<CreateTransactionBody>, res: Response) => {
    const { userId } = req.params;

    try {
        const summary = await sql`
        SELECT SUM(amount) as balance,
        COALESCE(SUM(CASE WHEN category = 'income' THEN amount ELSE 0 END), 0) as income,
        COALESCE(SUM(CASE WHEN category = 'expense' THEN amount ELSE 0 END), 0) as expense
        FROM transactions 
        WHERE user_id = ${userId}
        `;
        return res.status(200).json(summary);

    } catch (error) {
        console.log("Error fetching summary", error);
        return res.status(500).json({ message: "Failed to fetch summary" });
    }
}
