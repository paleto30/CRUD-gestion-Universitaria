import { Router } from "express";
import campoController from "./../controller/campo.controllers.js";

const router = Router();


// get ruta para obtener todos los campo
router.get("/", campoController.getCampos);
// get ruta para obtener un solo campo
router.get("/:campo_id", campoController.getCampo);
// post ruta para agregar un nuevo campo 
router.post("/", campoController.addCampo);
// put ruta para actualizar un campo
router.put("/:campo_id",campoController.updateCampo); 
// delete ruta para eliminar un campo 
router.delete("/:campo_id", campoController.deleteCampo);
// get ruta para buscar por nombre un campo 
router.get("/buscar/:campo_nombre",campoController.getName);

export default router;