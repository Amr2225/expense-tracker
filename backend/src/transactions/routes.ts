import { Router } from "express";

// Validators
import { createTransactionValidator, transactionIdValidator, userIdValidator, validate } from "@/transactions/validators";

// Controller
import { deleteTransaction, getSummary, getTransactions, makeTransaction } from "@/transactions/controller";

// Middleware
import { normalLimiterMiddleware } from "@/middleware/rateLimitter";

const router = Router();


router.get('/summary/:userId', userIdValidator, validate, getSummary);

router.get('/:userId', normalLimiterMiddleware, userIdValidator, validate, getTransactions);
router.post('/', createTransactionValidator, validate, makeTransaction);
router.delete('/:transactionId', transactionIdValidator, validate, deleteTransaction);


export default router;

