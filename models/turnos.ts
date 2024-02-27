import { Model, Schema, Types, model } from "mongoose";


export interface ITurnos {
    createdAt: Date
    user: Types.ObjectId;
    fecha: String;
    horario: String;
    name: String;
    email: String;
    telefono: String;
    status: String;
    servicio: String,
    precio: String,
    empleado: String;
    save: () => Promise<any>;
}


const turnosSchema = new Schema<ITurnos>({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    horario: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    empleado: {
        type: String,
        required: true,
    }
})

const Turnos: Model<ITurnos> = model<ITurnos>('Turnos', turnosSchema);


export default Turnos;