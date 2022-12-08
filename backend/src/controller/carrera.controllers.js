import getConnection from "../database/database.js";


const getCarreras = async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.query(`
              SELECT carrera_id, carrera_nombre FROM carrera
              ORDER BY carrera_nombre ASC
          `);
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };


const getCarrera = async (req, res) => {
  try {
    const { carrera_id } = req.params;
    console.log("Parametros de getCampo", req.params);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT carrera_id, carrera_nombre 
        FROM carrera
        WHERE carrera_id = ?`,
        carrera_id
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


const addCarrera = async (req, res) => {
    try {
      const { carrera_id, carrera_nombre } = req.body;
      const carrera = { carrera_id, carrera_nombre };
      const connection = await getConnection();
      const result = await connection.query(
        `      
        INSERT INTO carrera SET ?
            `,
        carrera
      );
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};
  
const deleteCarrera = async (req, res) => {
    try {
      const { carrera_id } = req.params;
      const connection = await getConnection();
      const result = await connection.query(
        `
                  DELETE FROM carrera WHERE carrera_id = ?
              `,
        carrera_id
      );
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};



const updateCarrera = async (req, res) => {
  try {
    const { carrera_id } = req.params;
    const { carrera_nombre } = req.body;

    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE carrera SET carrera_nombre = ? WHERE carrera_id = ?", [carrera_nombre, carrera_id]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getName = async (req, res) => {
  try {
    const { carrera_nombre } = req.params;
    const { carrera_id } = req.body;
    const cuerpo = { carrera_id };
    console.log("REQ BODY desde getName: ", req.body);
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT carrera_id, carrera_nombre
          FROM carrera
          WHERE carrera_nombre = ?`,
      [carrera_nombre, cuerpo]
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
    getCarreras,
    getCarrera,
    addCarrera,
    updateCarrera,
    deleteCarrera,
    getName,
  };
  
  export default methodsHTTP;
