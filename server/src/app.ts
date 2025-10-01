import cookieParser from 'cookie-parser';
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import { globalErrorHandler } from './middleware/globalErrorHandler';
const app = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors());
// Application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        message: "Server live⚡"
    })
});

// Global Error Handler
app.use(globalErrorHandler)

app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    })
})

export default app;