import {
    obtenerCampos,
    nuevoCampo,
    eliminarCampo,
    editarCampo,
    obtenerCampo,
    buscarNombre,
} from "../Apis/APIcampo.js";


document.addEventListener('DOMContentLoaded',() =>{
    getCampos();
    updateCampo();
});


async function getCampos(){
    const campos = await obtenerCampos();
    const camposObtenidos = document.querySelector("#campos");
    let html = "";
    campos.forEach( campo => {
        const { campo_id, campo_nombre } = campo;
        html +=`
        <tr>
            <td>${campo_nombre}</td>
            <td ><a href="" data-campo="${campo_id}" idCampo=${campo_id} class="btn btn-success editar" data-bs-toggle="modal"
              data-bs-target="#updateCampo">Editar</a></td>
            <td>
                <a href="#" data-campo="${campo_id}" class="btn btn-danger eliminar">Eliminar</a>
            </td>
            
        </tr>
        `,
        camposObtenidos.innerHTML = html;

    });
}


//   ya funciona
/* INGRESAR NUEVO ESTUDIANTE  - CRUD (C) */
const formulario = document.querySelector("#formularioC");
formulario.addEventListener('submit', crearCampo);

async function crearCampo(e) {
    e.preventDefault(e);
    const campo_nombre = document.querySelector("#nombre").value;
    
    const campo = {
        campo_nombre
    };
  /* llamamos a la funcion metodo HTTP POST */
    await nuevoCampo(campo);
}


//====================================================================================================


/* ELIMINAR ESTUDIANTE */

const listado = document.querySelector("#campos");
listado.addEventListener('click', confirmarEliminar);

async function confirmarEliminar(e) {
  if (e.target.classList.contains("eliminar")) {
    console.log(e.target.classList.contains("eliminar"));
    const campo_id = parseInt(e.target.dataset.campo);
    console.log("este es el id:",campo_id);
    const confirmar = confirm("¿Deseas eliminar este Estudiante?");
    if (confirmar) {
      /* llamamos a la funcion metodo HTTP DELETE */
      await eliminarCampo(campo_id);
      console.log("ya  se ejecuto la funcion de eliminar");
    }
  }
};


//===============================================================================================================

// editar
//EDITAR ESTUDIANTE    funciona--->>

function updateCampo() {
  const listado = document.querySelector("#campos");
  listado.addEventListener("click", loadDetail);

  async function loadDetail(e) {
    if (e.target.classList.contains("editar")) {
      console.log("existe:",e.target.classList.contains("editar"));
      const campo_id = e.target.getAttribute("idCampo");
      console.log(campo_id);
      const campo = await obtenerCampo(campo_id);
      console.log(campo);
      mostrarCampo(campo);
      // registra el formulario
      const formulario = document.querySelector("#formularioUpdate");
      formulario.addEventListener("submit", validarCampo);
    }
  }
};

function mostrarCampo(campo) {
  const inputid = campo[0]["campo_id"];
  const inputnombre = campo[0]["campo_nombre"];
  console.log("id:",inputid,"\nnombre:",inputnombre);
  document.querySelector("#idUpdate").value = inputid;
  document.querySelector("#nombreUpdate").value = inputnombre;
}

async function validarCampo(e) {
  e.preventDefault();
  const campo = {
    campo_id: document.querySelector("#idUpdate").value,
    campo_nombre: document.querySelector("#nombreUpdate").value, 
  };
  const confirmar = confirm("¿Deseas Actualizar este campo?");
    if (confirmar) {
      await editarCampo(campo);
      console.log("ya  se ejecuto la funcion de actualizar");
    }
}
// fin de editar  ---->> 



// buscar por nombreee CAMPO --->>
/* BUSQUEDA NOMBRE    Ya funciona :) */
const search = document.querySelector("#search");
search.addEventListener("input", searchCampo);

async function searchCampo(e) {
  let searching = e.target.value;
  if (e.target.value === "") {
    getCampos();
  } else {
    const campo = await buscarNombre(searching);
    const campos = document.querySelector("#campos");
    let html = "";
    campo.forEach((camp) => {
      const { campo_id, campo_nombre } = camp;
      html += `
            <tr>
              <td>${campo_nombre}</td>
                    
              <td ><a href="" data-campo="${campo_id}" idCampo=${campo_id} class="btn btn-success editar" data-bs-toggle="modal"
              data-bs-target="#updateCampo">Editar</a></td>
              <td ><a href="#" data-campo="${campo_id}" class="btn btn-danger eliminar">Eliminar</a></td>
             </tr> 
          `;
    });
    campos.innerHTML = html;
  }
};



