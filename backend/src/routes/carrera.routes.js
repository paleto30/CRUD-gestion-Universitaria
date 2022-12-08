import { Router } from "express";
import carreraController from "./../controller/carrera.controllers.js";

const router = Router();


// get ruta para obtener todas las carreras
router.get("/", carreraController.getCarreras);
// get ruta para obtener una sola carrera
router.get("/:carrera_id", carreraController.getCarrera);
// post ruta para agregar una nueva carrera 
router.post("/", carreraController.addCarrera);
// put ruta para actualizar una carrera
router.put("/:carrera_id",carreraController.updateCarrera); 
// delete ruta para eliminar una carrera
router.delete("/:carrera_id", carreraController.deleteCarrera);
// get ruta para buscar por nombre un carrera 
router.get("/buscar/:carrera_nombre",carreraController.getName);

export default router;