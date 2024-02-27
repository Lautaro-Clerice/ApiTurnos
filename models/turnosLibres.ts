import { Model, Schema, Types, model } from "mongoose";


export interface ITurnosLibres {
    _id: Types.ObjectId;
    createdAt: Date;
    fecha: String;
    horario: String;
    empleado:String;
    status: String;
    
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
    },
    empleado: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        default:'Libre',
    }

})
turnosLibresSchema.methods.toJSON = function() {
    const {_id, ...libre} = this.toObject();
    return libre;
}
const TurnosLibres: Model<ITurnosLibres> = model<ITurnosLibres>('TurnosLibres', turnosLibresSchema);


export default TurnosLibres;