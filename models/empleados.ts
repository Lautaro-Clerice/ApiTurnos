import { Model, Schema, model } from "mongoose";


export interface IEmpleado {
    nombre: string,
    rol: string,

}

const empleadosSchema = new Schema<IEmpleado> ({
    nombre:{
        type: String,
        required: true,
    },
    rol:{
        type: String,
        required: true,
    }
})
empleadosSchema.methods.toJSON = function() {
    const {__v, _id, ...emp} = this.toObject();
    return emp;
}
const Empleados = Model<IEmpleado> = model<IEmpleado>('Empleados', empleadosSchema)

export default Empleados;