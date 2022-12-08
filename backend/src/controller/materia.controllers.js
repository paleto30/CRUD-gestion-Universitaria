import getConnection from "../database/database.js";



const getMaterias = async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.query(`
              SELECT materia_id, materia_nombre, docente_nombre, carrera_nombre 
              FROM materia
              INNER JOIN docente ON materia.docente_id = docente.docente_id
              INNER JOIN carrera ON materia.carrera_id = carrera.carrera_id
              ORDER BY materia_nombre ASC
          `);
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };


const getMateria = async (req, res) => {
  try {
    const { materia_id } = req.params;
    console.log("Parametros de getCampo", req.params);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT materia_id, materia_nombre, docente_id, carrera_id
        FROM materia
        WHERE materia_id = ?`,
        materia_id
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

  const addMateria = async (req, res) => {
    try {
      const { materia_id, materia_nombre, docente_id, carrera_id } = req.body;
      const materia = {  materia_id, materia_nombre, docente_id, carrera_id  };
      const connection = await getConnection();
      const result = await connection.query(
        `      
        INSERT INTO materia SET ?
            `,
        materia
      );
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};

const deleteMateria = async (req, res) => {
    try {
      const { materia_id } = req.params;
      const connection = await getConnection();
      const result = await connection.query(
        `
                  DELETE FROM materia WHERE materia_id = ?
              `,
        materia_id
      );
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};

const updateMateria = async (req, res) => {
  try {
    const { materia_id } = req.params;
    const { materia_nombre, docente_id , carrera_id } = req.body;
    const materia = {
      materia_id ,
      materia_nombre,
      docente_id,
      carrera_id
    };
    console.log("entro aqui objeto BODY", materia);
    console.log("entro aqui objeto PARAMS", materia_id);
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE materia SET materia_nombre = ?, docente_id = ?, carrera_id = ? WHERE materia_id = ?",
      [
        materia_nombre,
        docente_id,
        carrera_id,
        materia_id,
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
    const { materia_nombre } = req.params;
    const { materia_id, docente_id, carrera_id } = req.body;
    const cuerpo = { materia_id, docente_id, carrera_id };
    console.log("REQ BODY desde getName: ", req.body);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT materia_id, materia_nombre , docente_nombre, carrera_nombre
          FROM materia
          INNER JOIN docente ON materia.docente_id = docente.docente_id
          INNER JOIN carrera ON materia.carrera_id = carrera.carrera_id
          WHERE materia_nombre = ?`,
      [materia_nombre, cuerpo]
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
    getMaterias,
    getMateria,
    addMateria,
    deleteMateria,
    updateMateria,
    getName
  };
  
  export default methodsHTTP;
