import express, { Request, Response, NextFunction } from 'express';
// import taskRoutes from './routes/tasks';
import { config } from 'dotenv'
import mongoose from 'mongoose';
import { router as boardRouter } from './routes/board';
import { router as CardRouter } from './routes/card';
import cors from 'cors'

config();

const app = express();
const port = process.env.PORT || 4000;
const mongoString = process.env.DATABASE_URL

app.use(express.json());

app.use(cors())

app.use('/api', boardRouter, CardRouter)

mongoose.connect(mongoString as string);

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});