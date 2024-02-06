import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'clericelautaro@gmail.com',
        pass: 'jdpm lkfp wdne boga '
    },
    from: 'clericelautaro@gmail.com'
});

const sendEmail = async (to: string, code: string): Promise<void> => {

    const mailOptions = {
        from: '"Lautaro Clerice" clericelautaro@gmail.com',
        to,
        subject: 'Codigo de verificacion',
        text:`
        Este es tu codigo para registrar tu cuenta
        ${code}

        `
    }

    try {
        
        await transporter.sendMail(mailOptions);
        console.log('Enviado');
        

    } catch (error) {
        console.error('Error al enviar el correo', error);
        
    }
}

export default sendEmail