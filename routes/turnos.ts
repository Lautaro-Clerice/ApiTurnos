import { Router } from "express"
import { CreateTurnoLibre, LibrerarTurnoLibre, OcuparTurnoLibre,  TurnosClientes, createTurno, deleteTurno, getTurnos, getTurnosLibres} from "../controllers/turnos"
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


router.get('/TurnoCliente',
[
recolectarErrores
]
, TurnosClientes
)
router.post('/TLibres',
[
recolectarErrores
]
, CreateTurnoLibre
)

router.patch('/:id',
OcuparTurnoLibre)

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

router.put('/liberar',
LibrerarTurnoLibre)


export default router