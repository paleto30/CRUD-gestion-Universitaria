
//url
const urlCr = "http://localhost:4000/api/carreras";

// ya funciona
export const nuevaCarrera = async (carrera) => {
  try {
    await fetch(urlCr, {
      method: "POST",
      body: JSON.stringify(carrera), // data puede ser string o un objeto
      headers: {
        "Content-Type": "application/json", // Y le decimos que los datos se enviaran como JSON
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "carrera.html";
};


// ya funciona
export const obtenerCarreras = async () => {
    try {
      const resultado = await fetch(urlCr);
      const carreras = await resultado.json();
      return carreras;
    } catch (error) {
      console.log(error);
    }
  };



  // ya funciona
export const obtenerCarrera = async (id) => {
  try {
    const resultado = await fetch(`${urlCr}/${id}`);
    const carrera = await resultado.json();
    return carrera;
  } catch (error) {
    console.log(error);
  }
};

// ya funciona 
export const eliminarCarrera = async (id) => {
  try {
    await fetch(`${urlCr}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "carrera.html";
};


// ya funciona correcto
export const editarCarrera = async (carrera) => {
  try {
    await fetch(`${urlCr}/${carrera.carrera_id}`, {
      method: "PUT",
      body: JSON.stringify(carrera),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "carrera.html";
};

// un no funciona 
export const buscarNombre = async (nombre) => {
  try {
    const resultado = await fetch(`${urlCr}/buscar/${nombre}`);
    const nombres = await resultado.json();
    console.log(`entro aqui a buscar nombre: ${nombre}`);
    return nombres;
  } catch (error) {
    console.log(error);
  }
};


