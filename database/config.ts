import mongoose from "mongoose";




export const dbConnection = async(): Promise<void> => {
    try {
        const dbURL = process.env.DB_URL;
        if(!dbURL) {
            throw new Error('La url no esta definida')
        }
       await mongoose.connect(dbURL)
    } catch (error) {
        console.log(error);
        throw new Error('Error al  inciar la DB')
    }
}