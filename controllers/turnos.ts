
import { Request, Response } from "express";
import Turnos, { ITurnos } from '../models/turnos'; 
import { ObjectId } from "mongoose";

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
        // Intenta crear el turno
        const data = {
            ...turnoData,
            user: usuarioId,
            createdAt: new Date()
        }

        const turnos = new Turnos(data);
        await turnos.save();

        res.status(201).json({
            turnos
        });
    } catch (error) {
        // Captura y maneja cualquier error
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
    const { fecha, horario }: { fecha: string; horario: string } = req.body; // Extrae los campos fecha y horario del cuerpo de la solicitud

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