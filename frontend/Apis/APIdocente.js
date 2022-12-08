//url
const urlD = "http://localhost:4000/api/docentes";

export const obtenerDocentes = async () => {
    try {
      const resultado = await fetch(urlD);
      const docentes = await resultado.json();
      return docentes;
    } catch (error) {
      console.log(error);
    }
};

export const obtenerDocente = async (id) => {
  try {
    const resultado = await fetch(`${urlD}/${id}`);
    const docentes = await resultado.json();
    return docentes;
  } catch (error) {
    console.log(error);
  }
};

  
export const nuevoDocente = async (docente) => {
  try {
    await fetch(urlD, {
      method: "POST",
      body: JSON.stringify(docente), // data puede ser string o un objeto
      headers: {
        "Content-Type": "application/json", // Y le decimos que los datos se enviaran como JSON
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "docentes.html";
};

export const eliminarDocente = async (id) => {
  try {
    await fetch(`${urlD}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "docentes.html";
};


export const editarDocente = async (docente) => {
  try {
    await fetch(`${urlD}/${docente.docente_id}`, {
      method: "PUT",
      body: JSON.stringify(docente),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "docentes.html";
};


export const buscarNombre = async (nombre) => {
  try {
    const resultado = await fetch(`${urlD}/buscar/${nombre}`);
    const docente = await resultado.json();
    return docente;
  } catch (error) {
    console.log(error);
  }
};
