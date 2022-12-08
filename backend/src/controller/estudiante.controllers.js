import getConnection from "../database/database.js";

const getStudents = async (req, res) => {

  try {
    const connection = await getConnection();
    const result = await connection.query(`
            SELECT estudiante_id, estudiante_img, estudiante_cedula, estudiante_nombre, estudiante_sexo,  estudiante_jornada, estudiante_promedio, campo_nombre 
            FROM estudiante
            INNER JOIN campo
            ON estudiante.campo_id = campo.campo_id
            ORDER BY estudiante_nombre ASC
        `);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getStudent = async (req, res) => {
  try {
    const { estudiante_id } = req.params;
    console.log("Parametros de getStudent", req.params);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT estudiante_id,estudiante_img, estudiante_cedula, estudiante_nombre, estudiante_sexo, estudiante_jornada, estudiante_promedio, campo_id
        FROM estudiante
        WHERE estudiante_id = ?`,
        estudiante_id
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getStudentD = async (req, res) => {
  try {
    const { estudiante_id } = req.params;
    console.log("Parametros de getStudent", req.params);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT estudiante_id, estudiante_img, estudiante_cedula, estudiante_nombre, estudiante_sexo, estudiante_jornada, estudiante_promedio, campo_nombre
        FROM estudiante
        INNER JOIN campo ON estudiante.campo_id = campo.campo_id
        WHERE estudiante_id = ?`,
        estudiante_id
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


const addStudents = async (req, res) => {

  try {
    const { estudiante_img,estudiante_cedula, estudiante_nombre,estudiante_sexo,estudiante_jornada,estudiante_promedio, campo_id } = req.body;
    const estudiante = {estudiante_img, estudiante_cedula, estudiante_nombre, estudiante_sexo, estudiante_jornada, estudiante_promedio, campo_id };
    const connection = await getConnection();
    const result = await connection.query(
      `      
      INSERT INTO estudiante SET ?
          `,
      estudiante
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};




const deleteStudents = async (req, res) => {

  try {
    const { estudiante_id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      `
                DELETE FROM estudiante WHERE estudiante_id = ?
            `,
      estudiante_id
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


const updateStudent = async (req, res) => {
  try {
    const { estudiante_id } = req.params;

    const {
      estudiante_img,
      estudiante_cedula,
      estudiante_nombre,
      estudiante_sexo,
      estudiante_jornada,
      estudiante_promedio,
      campo_id
      /*  campoUpdate,
        imagenUpdate, */
    } = req.body;

    const students = {
      estudiante_img: estudiante_img,
      estudiante_id : estudiante_id,
      estudiante_cedula: estudiante_cedula,
      estudiante_nombre: estudiante_nombre,
      estudiante_sexo: estudiante_sexo,
      estudiante_jornada: estudiante_jornada,
      estudiante_promedio: estudiante_promedio,
      campo_id: campo_id
    };
    console.log("entro aqui objeto BODY", students);
    console.log("entro aqui objeto PARAMS", estudiante_id);
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE estudiante SET estudiante_img = ?, estudiante_cedula = ?, estudiante_nombre = ?, estudiante_sexo = ?, estudiante_jornada = ?, estudiante_promedio = ?, campo_id = ?  WHERE estudiante_id = ?",
      /* , programa=?, sexo=?, jornada=?, promedio=?, campo_id=?, imagen= ? */
      [
        estudiante_img,
        estudiante_cedula,
        estudiante_nombre,
        estudiante_sexo,
        estudiante_jornada,
        estudiante_promedio,
        campo_id,
        estudiante_id,
      ]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getName = async (req, res) => {
  try {
    const { estudiante_nombre } = req.params;
    const { estudiante_id,estudiante_img, estudiante_cedula, estudiante_sexo, estudiante_jornada, estudiante_promedio, campo_id } = req.body;
    const cuerpo = { estudiante_id, estudiante_img, estudiante_cedula, estudiante_sexo, estudiante_jornada, estudiante_promedio, campo_id };
    console.log("REQ BODY desde getName: ", req.body);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT estudiante_id, estudiante_img, estudiante_cedula, estudiante_nombre, estudiante_sexo, estudiante_jornada, estudiante_promedio, campo_nombre
          FROM estudiante
          INNER JOIN campo
          ON estudiante.campo_id = campo.campo_id
          WHERE estudiante_nombre = ?`,
      [estudiante_nombre, cuerpo]
    );
    console.log("resultado:", result);
    console.log("REQ PARAMS desde getName", req.params);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};



 

const methodsHTTP = {
  getStudents,
  getStudent,
  getStudentD,
  addStudents,
  deleteStudents,
  updateStudent,
  getName,
};

export default methodsHTTP;
