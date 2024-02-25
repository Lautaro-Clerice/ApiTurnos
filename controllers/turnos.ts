
import { Request, Response } from "express";
import Turnos, { ITurnos } from '../models/turnos'; 
import { ObjectId } from "mongoose";
import TurnosLibres, { ITurnosLibres } from "../models/turnosLibres";

export const getTurnos = async (req: Request, res : Response) => {
    
    const usuarioId: ObjectId = req.body.usuarioConfirmado._id;
    const consulta = {user: usuarioId};
    const turnos = await Turnos.find(consulta)

    res.status(200).json({
        data: [
            ...turnos
        ]
    });
    
};



export const createTurno = async (req: Request, res: Response) => {
    const usuarioId: ObjectId = req.body.usuarioConfirmado._id;
    const turnoData: ITurnos = req.body;

    try {
        const data = {
            ...turnoData,
            user: usuarioId,
            createdAt: new Date(),
            status:"Pendiente"
        }

        const turnos = new Turnos(data);
        await turnos.save();

        res.status(201).json({
            turnos
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al crear el turno. Asegúrate de que los datos sean correctos."
        });
    }
}
export const deleteTurno = async (req: Request, res: Response) => {
    const turnoId: ObjectId = req.params.id;

    try {
        const turno = await Turnos.findById(turnoId);
        
        if (!turno) {
            return res.status(404).json({ error: "El turno no fue encontrado." });
        }

        await Turnos.deleteOne({ _id: turnoId });

        res.status(200).json({ message: "El turno ha sido eliminado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al intentar eliminar el turno." });
    }
};

export const CreateTurnoLibre  = async (req: Request, res: Response) => {
    const { fecha, horario, empleado }: ITurnosLibres = req.body;
    if (!fecha || !horario || !empleado) {
        console.error('Falta uno o más campos obligatorios (fecha, horario, empleado)');
        return res.status(400).json({
            error: 'Falta uno o más campos obligatorios (fecha, horario, empleado)'
        });
    }
    const newTurnoLibre = new  TurnosLibres({fecha, horario, empleado})
    try {
        const turnoExistente = await TurnosLibres.findOne({fecha, horario,empleado});

        if(turnoExistente) {
            return res.status(400).json({
                error: 'Ya se encuentra un turno disponible'
            })
           
        }
        await newTurnoLibre.save()
        console.log('Turno generado con exito');
        return res.status(200).json({
            message: 'Turno generado con éxito'
        });
        
    } catch (error) {
        console.log('error al generar nuevo turno libre',error);
        
    }
}

export const getTurnosLibres = async (req: Request, res: Response) => {
    try {
        const turnosLibres: ITurnosLibres[] = await TurnosLibres.find();

        const turnosLibresFormateados = turnosLibres.map((turnoLibre: ITurnosLibres) => ({
            fecha: turnoLibre.fecha,
            horario: turnoLibre.horario,
            empleado: turnoLibre.empleado,
            id:turnoLibre._id,
            status: turnoLibre.status
        }));
        
        res.status(200).json({
            data: turnosLibresFormateados
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los turnos libres." });
    }
};


export const TurnosClientes = async (req: Request, res : Response) => {
    try {
        const turnosLibres: ITurnos[] = await Turnos.find();

        const turnosLibresFormateados = turnosLibres.map((turnoLibre: ITurnos) => ({
            fecha: turnoLibre.fecha,
            horario: turnoLibre.horario,
            createdAt: turnoLibre.createdAt,
            user: turnoLibre.user,
            name: turnoLibre.name,
            telefono: turnoLibre.telefono,
            status: turnoLibre.status,
            email: turnoLibre.email

        }));

        res.status(200).json({
            data: turnosLibresFormateados
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los turnos libres." });
    }
   
};


export const OcuparTurnoLibre = async (req: Request, res: Response) => {
    const turnoId: ObjectId = req.params.id;

    try {
        const turno = await TurnosLibres.findById(turnoId);
        
        if (!turno) {
            return res.status(404).json({ error: "El turno no fue encontrado." });
        }

        turno.status = 'Ocupado';

        await turno.save();

        res.status(200).json({ message: "El turno ha sido marcado como ocupado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al intentar actualizar el turno." });
    }
};
export const LibrerarTurnoLibre = async (req: Request, res: Response) => {
    const turnoId: ObjectId = req.params.id;

    try {
        const turno = await TurnosLibres.findById(turnoId);
        
        if (!turno) {
            return res.status(404).json({ error: "El turno no fue encontrado." });
        }

        turno.status = 'Libre';

        await turno.save();

        res.status(200).json({ message: "El turno ha sido marcado como libre correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al intentar actualizar el turno." });
    }
};