const url = "http://localhost:4000/api/uteistas";


// Ya funcionaa ... 
export const nuevoEstudiante = async (estudiante) => {
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(estudiante), // data puede ser string o un objeto
      headers: {
        "Content-Type": "application/json", // Y le decimos que los datos se enviaran como JSON
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "index.html";
};


// ya funcionaa.. ..
export const obtenerEstudiantes = async () => {
  try {
    const resultado = await fetch(url);
    const estudiantes = await resultado.json();
    return estudiantes;
  } catch (error) {
    console.log(error);
  }
};

// ya funciona
export const obtenerEstudiante = async (id) => {
  try {
    const resultado = await fetch(`${url}/${id}`);
    const estudiante = await resultado.json();
    return estudiante;
  } catch (error) {
    console.log(error);
  }
};
// ya funciona
export const obtenerEstudianteD = async (id) => {
  try {
    const resultado = await fetch(`${url}/detalle/${id}`);
    const estudiante = await resultado.json();
    return estudiante;
  } catch (error) {
    console.log(error);
  }
};

// ya funciona
export const eliminarEstudiante = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "index.html";
};


// ya funciona correcto
export const editarEstudiante = async (estudiante) => {
  try {
    await fetch(`${url}/${estudiante.estudiante_id}`, {
      method: "PUT",
      body: JSON.stringify(estudiante),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "index.html";
};
// para detalles 
export const editarEstudianteD = async (estudiante) => {
  try {
    await fetch(`${url}/detalle/${estudiante.estudiante_id}`, {
      method: "PUT",
      body: JSON.stringify(estudiante),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "index.html";
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
export async function getCampos() {
  try {
    const urlc = 'http://localhost:4000/api/campos/';
    const response = await fetch(urlc);
    const result = await response.json();
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}