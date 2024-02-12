import express, { Express } from 'express';
import cors from 'cors';
import authRoutes from '../routes/auth';
import turnosRoutes from '../routes/turnos';
import { dbConnection } from '../database/config';

export class Server {
    app: Express;
    port: string | number | undefined;
    authPath: string;
    turnosPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/auth';
        this.turnosPath = '/turnos';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(): Promise<void>  {
        await dbConnection();
    }

    routes(): void {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.turnosPath, turnosRoutes);
    }

    middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors({
            origin: ['http://localhost:3000', 'https://re-turn-project.vercel.app']
        }));
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}
