import { Router } from "express";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { DeleteServicio, createServicio, getServicios, updateServicio } from "../controllers/servicios";

const router = Router();

router.post('/',
[recolectarErrores],
createServicio
)

router.delete('/:id',
[recolectarErrores],
DeleteServicio)

router.get('/',
[recolectarErrores],

getServicios)

router.patch('/:id',
[recolectarErrores],
updateServicio)

export default router