import { Router } from "express";
import docenteController from "./../controller/docente.controllers.js";

const router = Router();

router.get("/", docenteController.getDocentes); // todos los docentes
router.get("/:docente_id", docenteController.getDocente); // solo un docente
router.post("/", docenteController.addDocente); // agregar docente
router.delete("/:docente_id", docenteController.deleteDocente);// eliminar docente
router.put("/:docente_id",docenteController.updateDocente); // actualizar docente
router.get("/buscar/:docente_nombre",docenteController.getName); // buscar por nombre

export default router;