import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import Usuario, { Iuser } from "../models/usuario";
const validarJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers['x-token'] as string;

    if(!token) {
        res.status(401).json({
            msg:'No hay token en la peticion'
        })
        return;
    }

    try {
        const clave = process.env.CLAVEJWT as string;

        const payload = jwt.verify(token, clave) as JwtPayload;

        const {id} = payload;

        const usuarioConfirmado: Iuser | null = await Usuario.findById(id);

        if(!usuarioConfirmado) {
            res.status(404).json({
                msg:'No se encontro el usuario'
            });
            return;
        }
        req.body.usuarioConfirmado = usuarioConfirmado;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
        
        
    }

}

export default validarJWT;