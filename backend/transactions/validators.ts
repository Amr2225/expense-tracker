import { NextFunction, Request, Response } from "express";
import { check, validationResult, param } from "express-validator";

// TypeScript types
export interface CreateTransactionBody {
    user_id: string;
    title: string;
    amount: number;
    category: 'income' | 'expense';
}

export interface TypedRequest<T> extends Request {
    body: T;
    params: {
        userId: string;
        transactionId: string;
    }
}

export const createTransactionValidator = [
    check("user_id").notEmpty().withMessage("User ID is required").bail(),
    check("title").notEmpty().withMessage("Title is required").bail(),
    check("amount").isNumeric().withMessage("Amount must be a number").bail(),
    check("category").isIn(["income", "expense"]).withMessage("Category must be either 'income' or 'expense'").bail(),
    check('amount').custom((value, { req }) => {
        const typedReq = req as TypedRequest<CreateTransactionBody>;
        if (value < 0 && typedReq.body.category !== 'expense') {
            throw new Error("Negative amounts are only allowed for expenses");
        }

        if (value > 0 && typedReq.body.category !== 'income') {
            throw new Error("Positive amounts are only allowed for income");
        }
        return true;
    })
]

export const userIdValidator = [
    param("userId").notEmpty().withMessage("User ID is required").bail(),
]

export const transactionIdValidator = [
    param("transactionId").notEmpty().withMessage("Transaction ID is required").custom((value) => {
        if (isNaN(+value)) {
            throw new Error("Transaction ID must be a number");
        }
        return true;
    }).bail(),
]

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next();
}
