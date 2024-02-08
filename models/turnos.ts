import { Model, Schema, Types, model } from "mongoose";


export interface ITurnos {
    createdAt: Date
    user: Types.ObjectId;
    fecha: String;
    horario:String;  
}


const turnosSchema = new Schema <ITurnos>({
    createdAt:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true,
    },
    
    fecha:{
        type: String,
        required: true,
    },
    horario: {
        type: String,
        required: true,
    }

})

const Turnos: Model<ITurnos> = model<ITurnos>('Turnos', turnosSchema);


export default Turnos;