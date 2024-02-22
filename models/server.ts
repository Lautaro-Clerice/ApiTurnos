import express, { Express } from 'express';
import cors from 'cors';
import authRoutes from '../routes/auth';
import turnosRoutes from '../routes/turnos';
import { dbConnection } from '../database/config';
import empleadosRoutes from '../routes/empleados'
export class Server {
    app: Express;
    port: string | number | undefined;
    authPath: string;
    turnosPath: string;
    empleadosPath: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/auth';
        this.turnosPath = '/turnos';
        this.empleadosPath = '/empleados'
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
        this.app.use(this.empleadosPath, empleadosRoutes);
    }

    middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}
