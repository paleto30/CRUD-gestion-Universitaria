const url = "http://localhost:4000/api/materias";


// ya funcionaa.. ..
export const obtenerMaterias = async () => {
    try {
      const resultado = await fetch(url);
      const materias = await resultado.json();
      return materias;
    } catch (error) {
      console.log(error);
    }
  };

// ya funciona
export const obtenerMateria = async (id) => {
    try {
      const resultado = await fetch(`${url}/${id}`);
      const materia = await resultado.json();
      return materia;
    } catch (error) {
      console.log(error);
    }
  };
  

// Ya funcionaa ... 
export const nuevaMateria = async (materia) => {
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(materia), // data puede ser string o un objeto
      headers: {
        "Content-Type": "application/json", // Y le decimos que los datos se enviaran como JSON
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "materias.html";
};


// ya funciona
export const eliminarMateria = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "materias.html";
};


// ya funciona correcto
export const editarMateria = async (materia) => {
  try {
    await fetch(`${url}/${materia.materia_id}`, {
      method: "PUT",
      body: JSON.stringify(materia),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "materias.html";
};


export const buscarNombre = async (nombre) => {
  try {
    const resultado = await fetch(`${url}/buscar/${nombre}`);
    const nombres = await resultado.json();
    console.log(`entro aqui a buscar nombre: ${nombre}`);
    return nombres;
  } catch (error) {
    console.log(error);
  }
};

//=========================================================== api para campos===========================================

// ya funciona 
export async function getDocentes() {
  try {
    const urlD = 'http://localhost:4000/api/docentes';
    const response = await fetch(urlD);
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