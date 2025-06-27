import { Router } from "express";
import { createTransactionValidator, transactionIdValidator, userIdValidator, validate } from "./validators";
import { deleteTransaction, getSummary, getTransactions, makeTransaction } from "./controller";

const router = Router();

router.get('/:userId', userIdValidator, validate, getTransactions);
router.post('/', createTransactionValidator, validate, makeTransaction);
router.delete('/:transactionId', transactionIdValidator, validate, deleteTransaction);

router.get('/summary/:userId', userIdValidator, validate, getSummary);

export default router;

