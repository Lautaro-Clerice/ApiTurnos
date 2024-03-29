import { Router } from "express";
import { getUser, login, register, verifyUser } from "../controllers/auth";
import {check} from 'express-validator'
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { existeEmail } from "../helpers/validacionesDB";
const router = Router()

router.post(
    '/register',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({min:6}),
        check("email").custom(existeEmail),
        recolectarErrores
        
    ],
    register
)

router.post(
    "/login",
    [
        check("email", "El mail es obligatorio").not().isEmpty(),
        check("email", "El mail no es válido").isEmail(),
        check("password", "El password debe ser de 6 caracteres minimo").isLength({
            min: 6
        }),
        recolectarErrores
    ],
    login
);
router.patch(
    "/verify",
    [
        check("email", "El mail es obligatorio").not().isEmpty(),
        check("email", "El mail no es válido").isEmail(),
        check("code").not().isEmpty(),
        recolectarErrores
    ],
    verifyUser
);

router.get('/usuariosCreados',
[
    recolectarErrores
],
getUser)

export default router