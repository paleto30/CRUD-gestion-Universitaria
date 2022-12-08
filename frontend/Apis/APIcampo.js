
//url
const urlCampos = "http://localhost:4000/api/campos";

// ya funciona
export const nuevoCampo = async (campo) => {
  try {
    await fetch(urlCampos, {
      method: "POST",
      body: JSON.stringify(campo), // data puede ser string o un objeto
      headers: {
        "Content-Type": "application/json", // Y le decimos que los datos se enviaran como JSON
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "campos.html";
};



// ya funciona
export const obtenerCampos = async () => {
    try {
      const resultado = await fetch(urlCampos);
      const campos = await resultado.json();
      return campos;
    } catch (error) {
      console.log(error);
    }
  };



  // ya funciona
export const obtenerCampo = async (id) => {
  try {
    const resultado = await fetch(`${urlCampos}/${id}`);
    const campo = await resultado.json();
    return campo;
  } catch (error) {
    console.log(error);
  }
};

// ya funciona 
export const eliminarCampo = async (id) => {
  try {
    await fetch(`${urlCampos}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "campos.html";
};


// ya funciona correcto
export const editarCampo = async (campo) => {
  try {
    await fetch(`${urlCampos}/${campo.campo_id}`, {
      method: "PUT",
      body: JSON.stringify(campo),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  window.location.href = "campos.html";
};



// un no funciona 
export const buscarNombre = async (nombre) => {
  try {
    const resultado = await fetch(`${urlCampos}/buscar/${nombre}`);
    const nombres = await resultado.json();
    console.log(`entro aqui a buscar nombre: ${nombre}`);
    return nombres;
  } catch (error) {
    console.log(error);
  }
};


