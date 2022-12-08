import getConnection from "../database/database.js";


const getCampos = async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.query(`
              SELECT campo_id, campo_nombre FROM campo
              ORDER BY campo_nombre ASC
          `);
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };


const getCampo = async (req, res) => {
  try {
    const { campo_id } = req.params;
    console.log("Parametros de getCampo", req.params);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT campo_id, campo_nombre 
        FROM campo
        WHERE campo_id = ?`,
        campo_id
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


  const addCampo = async (req, res) => {
    try {
      const { campo_id, campo_nombre } = req.body;
      const campo = { campo_id, campo_nombre };
      const connection = await getConnection();
      const result = await connection.query(
        `      
        INSERT INTO campo SET ?
            `,
        campo
      );
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};
  
const deleteCampo = async (req, res) => {
    try {
      const { campo_id } = req.params;
      const connection = await getConnection();
      const result = await connection.query(
        `
                  DELETE FROM campo WHERE campo_id = ?
              `,
        campo_id
      );
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};



const updateCampo = async (req, res) => {
  try {
    const { campo_id } = req.params;
    const { campo_nombre } = req.body;
    const campos = {
      campo_id ,
      campo_nombre
    };
    console.log("entro aqui objeto BODY", campos);
    console.log("entro aqui objeto PARAMS", campo_id);
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE campo SET campo_nombre = ? WHERE campo_id = ?",
      [
        campo_nombre,
        campo_id,
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
    const { campo_nombre } = req.params;
    const { campo_id } = req.body;
    const cuerpo = { campo_id };
    console.log("REQ BODY desde getName: ", req.body);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT campo_id, campo_nombre
          FROM campo
          WHERE campo_nombre = ?`,
      [campo_nombre, cuerpo]
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
    getCampos,
    getCampo,
    getName,
    addCampo,
    updateCampo,
    deleteCampo,
  };
  
  export default methodsHTTP;
