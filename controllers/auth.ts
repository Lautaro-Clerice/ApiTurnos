import { Request, Response } from "express"
import Usuario, { Iuser } from "../models/usuario"
import bcryptjs from 'bcryptjs'
import randomstring from  'randomstring'
import sendEmail from "../mailer/mailer"
import { generarJWT } from "../helpers/generarToken"


export const register = async (req: Request, res: Response) => {
    const {nombre, email, telefono, password }: Iuser = req.body

    const usuario = new Usuario({nombre, email, telefono});
    
    const salt = bcryptjs.genSaltSync();

    try {
        usuario.password = bcryptjs.hashSync(password, salt);
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
    }
    
    
    const newCode = randomstring.generate(6);
    usuario.code = newCode;
    await usuario.save();
    await sendEmail(email, newCode)
    res.status(201).json({
        usuario
    })
}
export const login = async (req: Request, res: Response): Promise<void> => {

    const {email, password}: Iuser = req.body;

    try {
        
        const usuario = await Usuario.findOne({email});

        if(!usuario) {
            res.status(404).json({
                msg: "No se encontro el mail en la DB"
            });
            return
        }

        const validarPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validarPassword) {
            res.status(401).json({
                msg: "La contraseña es incorrecta"
            });
            return;
        };

        const token = await generarJWT(usuario.id);

        res.status(202).json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        })    
    }
}

export const verifyUser = async (req: Request, res: Response) => {

    const {email, code} = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        if(!usuario) {
            res.status(404).json({
                msg: "No se encontro el mail en la DB"
            });
            return;
        }

        if(usuario.verified) {
            res.status(400).json({
                msg: "El usuario ya esta correctamente verificado"
            });
            return;
        }

        if(code !== usuario.code) {
            res.status(401).json({
                msg: "El código ingresado no es correcto"
            })
            return;
        };

        await Usuario.findOneAndUpdate(
            {email},
            {verified: true}
        );

        res.status(200).json({
            msg: "Usuario verificado con éxito"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        })   
    }

}


export const getUser = async (req: Request, res : Response) => {
    try {
        const Usuarios: Iuser[] = await Usuario.find();

        const UsuariosGral = Usuarios.map((usuario: Iuser) => ({
            name: usuario.nombre,
            telefono: usuario.telefono,
            email: usuario.email,
            createdAt: usuario.createdAt
        }));

        res.status(200).json({
            data: UsuariosGral
        }) 
        }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
   
};
