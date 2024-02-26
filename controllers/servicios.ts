import { Request, Response } from "express";
import Servicios, { IServices } from "../models/servicios";
import { ObjectId } from "mongodb";



export const createServicio = async  (req: Request, res: Response) => {
    const {servicio, precio, profesional} = req.body;
    const nuevoServicio = new Servicios({servicio, precio, profesional});
    try {
        const servicioExistente = await Servicios.findOne({servicio})
    if(servicioExistente){
        return res.status(400).json({
            error:"Ya hay un servicio con este nombre"
        })
    }
    const servicioGuardado = await nuevoServicio.save();
    res.status(201).json({ message: "El servicio se cargo con exito", servicioGuardado });
    } catch (error) {
        console.log(error);
        
    }
    
}


export const DeleteServicio = async (req: Request, res: Response) => {
    const servicioId: ObjectId = req.params.id;
    try {
        const eliminarServicio = await  Servicios.findById(servicioId)
        if(!eliminarServicio){
            return res.status(404).json({
                error:'No se encontro el servicio seleccionado'
            })
            
        }
        await Servicios.deleteOne({ _id: servicioId })
        return res.status(200).json('Turno eliminado con exito')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al intentar eliminar el servicio." });
        
    }
}

export const getServicios = async (req: Request, res: Response) => {
    try {
        const service : IServices[] = await Servicios.find();
        const listaServicios = service.map((serv: IServices) => ({
            servicio: serv.servicio,
            precio: serv.precio,
            profesional: serv.profesional
        }))

        res.status(200).json({
            data: listaServicios
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener los empleados" });
    }
}

export const updateServicio = async (req: Request, res: Response) => {
    const servicioId: ObjectId = req.params.id;
    const { servicio, precio, profesional } = req.body;
    try {
        const servicioExistente = await Servicios.findById(servicioId);
        if (!servicioExistente) {
            return res.status(404).json({
                error: 'No se encontró el servicio seleccionado'
            });
        }

        servicioExistente.servicio = servicio;
        servicioExistente.precio = precio;
        servicioExistente.profesional = profesional;

        const servicioActualizado = await servicioExistente.save();

        res.status(200).json({
            message: 'Servicio actualizado con éxito',
            servicioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al intentar actualizar el servicio." });
    }
}