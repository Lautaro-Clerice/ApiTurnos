import { Model, Schema, Types, model } from "mongoose";

export interface IUserTurnos {
    name: String;
    telefono:Number;
    email:String;
}

export interface ITurnos {
    createdAt: Date
    user: Types.ObjectId;
    usuario: IUserTurnos [];
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
    usuario: {
        type: [{
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
        }],
        required: true,
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