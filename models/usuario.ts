import { Model, Schema, model } from "mongoose";

export interface Iuser {
    nombre: String;
    email: String;
    telefono: Number;
    code?: String;
    verified?: String;
    password: String;
    createdAt: Date;
};

const UserSchema = new Schema<Iuser>({
    createdAt: {
        type: Date,
        default: Date.now,
    },
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
