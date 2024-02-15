import { Router } from "express"
import { CreateTurnoLibre, createTurno, deleteTurno, getTurnos, getTurnosLibres, updateTurno } from "../controllers/turnos"
import validarJWT from "../middlewares/validarJWT"
import { recolectarErrores } from "../middlewares/recolectarErrores"
import { check } from "express-validator"

const router = Router()

router.get('/', 

[
    validarJWT,
    recolectarErrores
]
,getTurnos),

router.get('/TLibres',
[
recolectarErrores
]
, getTurnosLibres
)

router.post('/TLibres',
[
recolectarErrores
]
, CreateTurnoLibre
)


router.post('/', 
[
    validarJWT,
    check('fecha', 'La fecha es obligatorio'),
    check('horario', 'El horario es obligatorio'),
    recolectarErrores
],
createTurno)

router.delete('/:id',
    deleteTurno
);

router.patch('/:id',
updateTurno
)

export default router