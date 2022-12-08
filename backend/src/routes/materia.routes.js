import { Router } from "express";
import materiaController from "./../controller/materia.controllers.js";


const router = Router();


// ruta para traer todas las materias
router.get("/",materiaController.getMaterias);

//ruta para traer solo una materia
router.get("/:materia_id",materiaController.getMateria);

// ruta para agregar una nueva materia
router.post("/",materiaController.addMateria);

//ruta para borrar una materia
router.delete("/:materia_id",materiaController.deleteMateria);

// ruta para actualizar un registro de mateeria 
router.put("/:materia_id",materiaController.updateMateria);

// ruta para buscar una materia por nombre
router.get("/buscar/:materia_nombre",materiaController.getName);




export default router;






