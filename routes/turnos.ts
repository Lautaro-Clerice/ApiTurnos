import { Router } from "express"
import { createTurno, deleteTurno, getTurnos } from "../controllers/turnos"
import validarJWT from "../middlewares/validarJWT"
import { recolectarErrores } from "../middlewares/recolectarErrores"
import { check } from "express-validator"

const router = Router()

router.get('/', 

   [
    validarJWT,
    recolectarErrores
   ]

    ,getTurnos)

router.post('/', 
[
    validarJWT,
    check('fecha', 'La fecha es obligatorio'),
    check('horario', 'El horario es obligatorio'),
    recolectarErrores
],
createTurno)

router.delete('/turnos/:id',
[
    validarJWT
],
deleteTurno);

export default router