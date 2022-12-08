import getConnection from "../database/database.js";



const getMatriculas = async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.query(`
              SELECT matricula_id, matricula_fecha, carrera_nombre ,estudiante_nombre
              FROM matricula
              INNER JOIN carrera ON matricula.carrera_id = carrera.carrera_id
              INNER JOIN estudiante ON matricula.estudiante_id = estudiante.estudiante_id
              ORDER BY matricula_id ASC
          `);
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };


const getMatricula = async (req, res) => {
  try {
    const { matricula_id } = req.params;
    console.log("Parametros de getCampo", req.params);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT matricula_id, matricula_fecha, carrera_id, estudiante_id
        FROM matricula
        WHERE matricula_id = ?`,
        matricula_id
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

  const addMatricula = async (req, res) => {
    try {
      const { matricula_id, matricula_fecha, carrera_id, estudiante_id } = req.body;
      const matricula = {  matricula_id, matricula_fecha, carrera_id, estudiante_id  };
      const connection = await getConnection();
      const result = await connection.query(
        `      
        INSERT INTO matricula SET ?
            `,
          matricula
      );
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};

const deleteMatricula = async (req, res) => {
    try {
      const { matricula_id } = req.params;
      const connection = await getConnection();
      const result = await connection.query(
        `
                  DELETE FROM matricula WHERE matricula_id = ?
              `,
        matricula_id
      );
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};

const updateMatricula = async (req, res) => {
  try {
    const { matricula_id } = req.params;
    const { matricula_fecha, carrera_id, estudiante_id } = req.body;
    const matricula = {
      matricula_id ,
      matricula_fecha,
      carrera_id,
      estudiante_id
    };
    console.log("entro aqui objeto BODY", matricula);
    console.log("entro aqui objeto PARAMS", matricula_id);
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE matricula SET matricula_fecha = ?, carrera_id = ?, estudiante_id = ?  WHERE matricula_id = ?",
      [
        matricula_fecha,
        carrera_id,
        estudiante_id,
        matricula_id,
      ]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getID = async (req, res) => {
  try {
    const { matricula_id } = req.params;
    const { matricula_fecha, carrera_id, estudiante_id } = req.body;
    const cuerpo = { matricula_fecha, carrera_id, estudiante_id };
    console.log("REQ BODY desde getName: ", req.body);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT matricula_id, matricula_fecha , carrera_nombre, estudiante_nombre
          FROM matricula
          INNER JOIN carrera ON matricula.carrera_id = carrera.carrera_id
          INNER JOIN estudiante ON matricula.estudiante_id = estudiante.estudiante_id
          WHERE matricula_id = ?`,
      [matricula_id, cuerpo]
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
    getMatriculas,
    getMatricula,
    addMatricula,
    deleteMatricula,
    updateMatricula,
    getID
  };
  
  export default methodsHTTP;
