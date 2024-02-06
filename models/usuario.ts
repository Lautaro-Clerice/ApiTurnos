import { Model, Schema, model } from "mongoose";

export interface Iuser {
    nombre:string;
    email:string;
    telefono:number;
    code?: string;
    verified?: string;
    password: string;
};

const UserSchema = new Schema<Iuser>({
    nombre: {
        type:String,
        required: [true,'El nombre es obligatorio']
    },
    password: {
        type:String,
        required: [true,'El nombre es obligatorio']
    },
    email:{
        type:String,
        required: [true,'El correo es obligatorio']
    },
    telefono:{
        type:Number,
        required: [true,'El telefono es obligatorio']
    },
    code:{
        type:String,
    },
    verified:{
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function() {
    const {__v, _id, code, ...usuario} = this.toObject();
    return usuario;
}

const Usuario: Model<Iuser> = model<Iuser>('Usuario', UserSchema);


export default Usuario;
