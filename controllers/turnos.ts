
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

export const updateTurno = async (req: Request, res: Response) => {
    const turnoId: ObjectId = req.params.id; // Obtén el ID del turno de la solicitud
    const { fecha, horario }: { fecha: string; horario: string } = req.body;

    try {
        const turnoExistente: ITurnos | null = await Turnos.findById(turnoId);
        if (!turnoExistente) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }
        if (fecha) {
            turnoExistente.fecha = fecha;
        }
        if (horario) {
            turnoExistente.horario = horario;
        }

        await turnoExistente.save();
        res.json({ turno: turnoExistente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el turno' });
    }
};

export const CreateTurnoLibre  = async (req: Request, res: Response) => {
    const { fecha, horario }: ITurnosLibres = req.body;
    const newTurnoLibre = new  TurnosLibres({fecha, horario})
    try {
        const turnoExistente = await TurnosLibres.findOne({fecha, horario});

        if(turnoExistente) {
            return res.status(400).json({
                error: 'Ya se encuentra un turno disponible'
            })
           
        }
        await newTurnoLibre.save()
        console.log('Turno generado con exito');
        
    } catch (error) {
        console.log('error al generar nuevo turno libre',error);
        
    }
}

export const getTurnosLibres = async (req: Request, res: Response) => {
    try {
        const turnosLibres: ITurnosLibres[] = await TurnosLibres.find();

        const turnosLibresFormateados = turnosLibres.map((turnoLibre: ITurnosLibres) => ({
            fecha: turnoLibre.fecha,
            horario: turnoLibre.horario
        }));

        res.status(200).json({
            data: turnosLibresFormateados
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los turnos libres." });
    }
};