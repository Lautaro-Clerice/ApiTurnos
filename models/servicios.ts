import { Model, Schema, model } from "mongoose";


export interface IServices {
    servicio: String;
    precio: String;
    profesional: string[];
}


const ServicesSchema = new Schema<IServices> ({
    servicio: {
        required:true,
        type: String
    },
    precio: {
        required:true,
        type: String,
    },
    profesional:{
        required: true,
        type: [String],
    }
})

ServicesSchema.methods.toJSON = function() {
    const {_id, ...serv} = this.toObject();
    return serv;
}
const Servicios = Model<IServices> = model<IServices>('Servicios', ServicesSchema)

export default Servicios;