import express from "express";
import { initDB } from "@/utils/db";
import compression from "compression";
import "dotenv/config";

// Modules
import transactionsRouter from "@/transactions/routes";

const app = express();
app.use(express.json());
app.use(compression());

const PORT = process.env["PORT"] || 3000;

app.use('/api/transactions', transactionsRouter);


initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${process.env["SERVER_URL"]}:${PORT}`);
    });
})
