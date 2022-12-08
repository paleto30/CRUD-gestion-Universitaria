import getConnection from "../database/database.js";



const getDocentes = async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.query(`
              SELECT docente_id, docente_cedula, docente_nombre, docente_sexo FROM docente
              ORDER BY docente_id ASC
          `);
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };


const getDocente = async (req, res) => {
  try {
    const { docente_id } = req.params;
    console.log("Parametros de getCampo", req.params);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT docente_id, docente_cedula, docente_nombre, docente_sexo
        FROM docente
        WHERE docente_id = ?`,
        docente_id
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

  const addDocente = async (req, res) => {
    try {
      const { docente_id, docente_cedula, docente_nombre, docente_sexo } = req.body;
      const docente = {  docente_id, docente_cedula, docente_nombre, docente_sexo  };
      const connection = await getConnection();
      const result = await connection.query(
        `      
        INSERT INTO docente SET ?
            `,
        docente
      );
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};

const deleteDocente = async (req, res) => {
    try {
      const { docente_id } = req.params;
      const connection = await getConnection();
      const result = await connection.query(
        `
                  DELETE FROM docente WHERE docente_id = ?
              `,
        docente_id
      );
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};

const updateDocente = async (req, res) => {
  try {
    const { docente_id } = req.params;
    const { docente_cedula, docente_nombre, docente_sexo } = req.body;
    const docente = {
      docente_id ,
      docente_cedula,
      docente_nombre,
      docente_sexo
    };
    console.log("entro aqui objeto BODY", docente);
    console.log("entro aqui objeto PARAMS", docente_id);
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE docente SET docente_cedula = ?,docente_nombre = ?, docente_sexo = ? WHERE docente_id = ?",
      [
        docente_cedula,
        docente_nombre,
        docente_sexo,
        docente_id,
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
    const { docente_nombre } = req.params;
    const { docente_id, docente_cedula, docente_sexo } = req.body;
    const cuerpo = { docente_id, docente_cedula, docente_sexo };
    console.log("REQ BODY desde getName: ", req.body);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT docente_id, docente_cedula ,docente_nombre, docente_sexo
          FROM docente
          WHERE docente_nombre = ?`,
      [docente_nombre, cuerpo]
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
    getDocentes,
    getDocente,
    addDocente,
    deleteDocente,
    updateDocente,
    getName
  };
  
  export default methodsHTTP;
