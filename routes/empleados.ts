import { Router } from "express";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { createEmpleado, getEmpleados } from "../controllers/empleados";


const router = Router()

router.get('/',

    [recolectarErrores],
    getEmpleados
)

router.post('/',


[recolectarErrores],
createEmpleado

)

export default router