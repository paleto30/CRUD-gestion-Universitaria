import { Router } from "express";
import matriculaController from "./../controller/matricula.controllers.js";

const router = Router();

// ruta para traer todas las matricula
router.get("/",matriculaController.getMatriculas);

//ruta para traer solo una matricula
router.get("/:matricula_id",matriculaController.getMatricula);

// ruta para agregar una nueva matricula
router.post("/",matriculaController.addMatricula);

//ruta para borrar una matricula
router.delete("/:matricula_id",matriculaController.deleteMatricula);

// ruta para actualizar un registro de matricula 
router.put("/:matricula_id",matriculaController.updateMatricula);

// ruta para buscar una matricula por nID
router.get("/buscar/:matricula_id",matriculaController.getID);


export default router;






