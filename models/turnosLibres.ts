import { Model, Schema, Types, model } from "mongoose";


export interface ITurnosLibres {
    createdAt: Date;
    fecha: String;
    horario: String;
}


const turnosLibresSchema = new Schema<ITurnosLibres>({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    fecha: {
        type: String,
        required: true,
    },
    horario: {
        type: String,
        required: true,
    }

})

const TurnosLibres: Model<ITurnosLibres> = model<ITurnosLibres>('TurnosLibres', turnosLibresSchema);


export default TurnosLibres;