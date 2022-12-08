import { Router } from "express";
import estudianteController from "./../controller/estudiante.controllers.js";

const router = Router();

// para traeer todos los registros de estudiantes
router.get("/", estudianteController.getStudents);

// para traer solo un estudiante
router.get("/:estudiante_id", estudianteController.getStudent);

// para traer solo un estudiante para detalles
router.get("/detalle/:estudiante_id", estudianteController.getStudentD);

// para agregar un nuevo estudiante
router.post("/", estudianteController.addStudents);

// para borrar un estudiante
router.delete("/:estudiante_id", estudianteController.deleteStudents);

// para actualizar un estudiante
router.put("/:estudiante_id",estudianteController.updateStudent);

// para buscar por nombre
router.get("/buscar/:estudiante_nombre", estudianteController.getName);


export default router;
