import { Request, Response } from "express";
import Empleados, { IEmpleado } from "../models/empleados";



export const getEmpleados = async (req: Request, res: Response) => {
    try {
        const Empleado : IEmpleado[] = await Empleados.find();
        const listaEmpleados = Empleado.map((empleado: IEmpleado) => ({
            nombre: empleado.nombre,
            rol: empleado.rol,
        }))

        res.status(200).json({
            data: listaEmpleados
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener los empleados" });
    }
}


export const createEmpleado = async  (req: Request, res: Response) => {
    const {nombre, rol} = req.body;
    const nuevoEmpleado = new Empleados({nombre, rol});
    const empleadoGuardado = await nuevoEmpleado.save();

    res.status(201).json({
        empleadoGuardado
    })
}