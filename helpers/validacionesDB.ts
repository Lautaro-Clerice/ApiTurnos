import sendEmail from "../mailer/mailer";
import Usuario, { Iuser } from "../models/usuario"

export const existeEmail = async (email:string): Promise<void> => {

    const existeEmail: Iuser | null = await Usuario.findOne({email});

    if (existeEmail && existeEmail.verified) {
        throw new Error(`El correo ${email} ya está registrado`)
    }

    if (existeEmail && existeEmail) {
        await sendEmail(email, existeEmail.code as string);
        throw new Error(`El correo ya está registrado, Codigo de verificacion enviado a ${email}`);
        
    }

}