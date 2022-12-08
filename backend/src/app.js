import express from "express";
import cors from 'cors';
import estudianteRoutes from "./routes/estudiante.routes.js";
import campoRoutes from "./routes/campo.routes.js";
import docenteRoutes from "./routes/docente.routes.js";
import carreraRoutes from "./routes/carrera.routes.js";
import materiaRoutes from "./routes/materia.routes.js";
import matriculaRoutes from "./routes/matricula.routes.js";



const app = express();

app.set("port", 4000);
app.use(cors());
app.use(express.json());


app.use("/api/uteistas", estudianteRoutes);
app.use("/api/campos", campoRoutes);
app.use("/api/docentes", docenteRoutes);
app.use("/api/carreras", carreraRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/matriculas",matriculaRoutes);
/* app.get("/", (request, response) => {
  response.send("Welcome FOX TO UTS");
});

app.get("/fox", (req, res) => {
  res.json({ message: "Welcome to the Jungle" });
});
 */


/* app.use("/", (req, res) => {
  res.send("Andreita Paulita");
}); */

export default app;
