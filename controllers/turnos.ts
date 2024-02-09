
import { Request, Response } from "express";
import Turnos, { ITurnos } from "../models/turnos";
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
    const turnoId: string = req.params.id;

    try {
        // Intenta encontrar el turno por su ID
        const turno = await Turnos.findById(turnoId);
        
        // Si el turno no existe, devuelve un error 404
        if (!turno) {
            return res.status(404).json({ error: "El turno no fue encontrado." });
        }

        // Elimina el turno
        await Turnos.deleteOne({ _id: turnoId });

        // Retorna un mensaje de éxito
        res.status(200).json({ message: "El turno ha sido eliminado correctamente." });
    } catch (error) {
        // Si ocurre un error, devuelve un error 500
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al intentar eliminar el turno." });
    }
};