const url = "http://localhost:4000/api/matriculas";


// ya funcionaa.. ..
export const obtenerMatriculas = async () => {
    try {
      const resultado = await fetch(url);
      const matriculas = await resultado.json();
      return matriculas;
    } catch (error) {
      console.log(error);
    }
  };

// ya funciona
export const obtenerMatricula = async (id) => {
    try {
      const resultado = await fetch(`${url}/${id}`);
      const matricula = await resultado.json();
      return matricula;
    } catch (error) {
      console.log(error);
    }
  };
  

// Ya funcionaa ... 
export const nuevaMatricula = async (matricula) => {
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(matricula), // data puede ser string o un objeto
      headers: {
        "Content-Type": "application/json", // Y le decimos que los datos se enviaran como JSON
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "matricula.html";
};


// ya funciona
export const eliminarMatricula = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "matricula.html";
};


// ya funciona correcto
export const editarMatricula = async (matricula) => {
  try {
    await fetch(`${url}/${matricula.matricula_id}`, {
      method: "PUT",
      body: JSON.stringify(matricula),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "matricula.html";
};


export const buscarID = async (id) => {
  try {
    const resultado = await fetch(`${url}/buscar/${id}`);
    const Id = await resultado.json();
    console.log(`entro aqui a buscar ID: ${id}`);
    return Id;
  } catch (error) {
    console.log(error);
  }
};

//=========================================================== api para campos===========================================

// ya funciona 
export async function getEstudiantes() {
  try {
    const urlE = 'http://localhost:4000/api/uteistas';
    const response = await fetch(urlE);
    const result = await response.json();
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
// ya funciona 
export async function getCarreras() {
    try {
      const urlC = 'http://localhost:4000/api/carreras';
      const response = await fetch(urlC);
      const result = await response.json();
      //console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }